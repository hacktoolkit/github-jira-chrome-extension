function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
    // custom code goes here
    chrome.runtime.openOptionsPage();
});
