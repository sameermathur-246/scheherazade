const themeButton = document.querySelector('#page-theme');
themeButton.addEventListener('click', () => {
 const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
 document.documentElement.dataset.theme = next;
 try { localStorage.setItem('scheherazade-theme', next); } catch {}
});
const queryForm = document.querySelector('#query-form');
queryForm?.addEventListener('submit', event => {
 event.preventDefault();
 const data = new FormData(queryForm);
 const message = ['Scheherazade enquiry', '', 'Name: ' + data.get('name'),
  'Email: ' + data.get('email'), '', data.get('message')].join('\n');
 const url = URL.createObjectURL(new Blob([message], {type: 'text/plain;charset=utf-8'}));
 const download = document.createElement('a');
 download.href = url;
 download.download = 'scheherazade-enquiry.txt';
 download.click();
 setTimeout(() => URL.revokeObjectURL(url), 1000);
 document.querySelector('#query-status').textContent = 'Your enquiry is ready to share.';
});
