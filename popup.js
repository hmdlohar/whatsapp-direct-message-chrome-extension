const STORAGE_KEY = 'wa_direct_history';
const LAST_NUMBER_KEY = 'wa_direct_last_number';
const MAX_HISTORY = 10;

function normalizePhone(phone) {
  let cleaned = phone.replace(/^\+/, '').replace(/\s/g, '');
  
  if (/^\d{10}$/.test(cleaned)) {
    cleaned = '91' + cleaned;
  }
  
  return cleaned;
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return date.toLocaleDateString();
}

function renderHistory(history) {
  const historyList = document.getElementById('historyList');
  const historySection = document.getElementById('historySection');
  
  if (!history || history.length === 0) {
    historySection.style.display = 'none';
    return;
  }
  
  historySection.style.display = 'block';
  historyList.innerHTML = history.slice(0, MAX_HISTORY).map((item, index) => `
    <div class="history-item" data-number="${item.number}" data-index="${index}">
      <div>
        <div class="number">${item.number}</div>
        <div class="time">${formatTime(item.timestamp)}</div>
      </div>
      <span class="delete" data-index="${index}">&times;</span>
    </div>
  `).join('');
  
  document.querySelectorAll('.history-item').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        e.stopPropagation();
        deleteHistoryItem(parseInt(e.target.dataset.index));
      } else {
        document.getElementById('phone').value = el.dataset.number;
      }
    });
  });
}

async function deleteHistoryItem(index) {
  const result = await chrome.storage.sync.get(STORAGE_KEY);
  let history = result[STORAGE_KEY] || [];
  history.splice(index, 1);
  await chrome.storage.sync.set({ [STORAGE_KEY]: history });
  renderHistory(history);
}

async function loadData() {
  const [lastNumberResult, historyResult] = await Promise.all([
    chrome.storage.sync.get(LAST_NUMBER_KEY),
    chrome.storage.sync.get(STORAGE_KEY)
  ]);
  
  const lastNumber = lastNumberResult[LAST_NUMBER_KEY];
  const history = historyResult[STORAGE_KEY] || [];
  
  if (lastNumber) {
    document.getElementById('phone').value = lastNumber;
  }
  
  renderHistory(history);
}

async function saveToHistory(phone) {
  const result = await chrome.storage.sync.get(STORAGE_KEY);
  let history = result[STORAGE_KEY] || [];
  
  const existingIndex = history.findIndex(h => h.number === phone);
  if (existingIndex !== -1) {
    history.splice(existingIndex, 1);
  }
  
  history.unshift({ number: phone, timestamp: Date.now() });
  
  if (history.length > 50) {
    history = history.slice(0, 50);
  }
  
  await chrome.storage.sync.set({ [STORAGE_KEY]: history });
}

document.getElementById('sendBtn').addEventListener('click', async () => {
  const phoneInput = document.getElementById('phone').value.trim();
  
  if (!phoneInput) {
    alert('Please enter a phone number');
    return;
  }

  const phone = normalizePhone(phoneInput);

  await chrome.storage.sync.set({ [LAST_NUMBER_KEY]: phone });
  
  await saveToHistory(phone);
  
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!tab) {
    alert('No active tab found');
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (phoneNumber) => {
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    args: [phone]
  });
  
  window.close();
});

document.getElementById('optionsLink').addEventListener('click', (e) => {
  e.preventDefault();
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open('options.html');
  }
});

document.getElementById('phone').addEventListener('input', async (e) => {
  await chrome.storage.sync.set({ [LAST_NUMBER_KEY]: e.target.value });
});

loadData();
