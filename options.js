const STORAGE_KEY = 'wa_direct_history';
const ITEMS_PER_PAGE = 15;

let history = [];
let currentPage = 1;

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

function renderTable() {
  const tbody = document.getElementById('historyTable');
  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
  
  if (history.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="empty">No history yet</td></tr>';
    document.getElementById('stats').textContent = '0 entries';
    document.getElementById('pageInfo').textContent = '';
    document.getElementById('prevBtn').disabled = true;
    document.getElementById('nextBtn').disabled = true;
    return;
  }
  
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = history.slice(start, end);
  
  tbody.innerHTML = pageItems.map((item, index) => `
    <tr>
      <td>${start + index + 1}</td>
      <td class="number">${item.number}</td>
      <td class="timestamp">${formatDate(item.timestamp)}</td>
      <td class="actions">
        <button class="btn btn-delete" data-index="${start + index}">Delete</button>
      </td>
    </tr>
  `).join('');
  
  document.getElementById('stats').textContent = `${history.length} entries`;
  document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById('prevBtn').disabled = currentPage === 1;
  document.getElementById('nextBtn').disabled = currentPage === totalPages;
  
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteItem(parseInt(btn.dataset.index)));
  });
}

async function loadHistory() {
  const result = await chrome.storage.sync.get(STORAGE_KEY);
  history = result[STORAGE_KEY] || [];
  currentPage = 1;
  renderTable();
}

async function deleteItem(index) {
  history.splice(index, 1);
  await chrome.storage.sync.set({ [STORAGE_KEY]: history });
  
  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages && currentPage > 1) {
    currentPage = totalPages;
  }
  
  renderTable();
}

document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
  }
});

document.getElementById('clearAll').addEventListener('click', async () => {
  if (confirm('Are you sure you want to clear all history?')) {
    history = [];
    await chrome.storage.sync.set({ [STORAGE_KEY]: history });
    renderTable();
  }
});

loadHistory();
