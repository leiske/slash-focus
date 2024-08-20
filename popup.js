document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('siteToggle');
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentSite = new URL(tabs[0].url).hostname;
    document.getElementById('currentSite').textContent = currentSite;
    
    chrome.storage.local.get(['disabledSites'], function(result) {
      const disabledSites = result.disabledSites || [];
      toggle.checked = !disabledSites.includes(currentSite);
    });
  });
  
  toggle.addEventListener('change', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const currentSite = new URL(tabs[0].url).hostname;
      chrome.storage.local.get(['disabledSites'], function(result) {
        let disabledSites = result.disabledSites || [];
        if (toggle.checked) {
          disabledSites = disabledSites.filter(site => site !== currentSite);
        } else {
          if (!disabledSites.includes(currentSite)) {
            disabledSites.push(currentSite);
          }
        }
        chrome.storage.local.set({disabledSites: disabledSites}, function() {
          console.log('Site toggle updated', { disabledSites });
        });
      });
    });
  });
});
