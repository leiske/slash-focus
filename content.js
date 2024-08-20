// add more rules and stuff here
function findSearchBar() {
  // look for easy tagged stuff
  let searchInput = document.querySelector('input[type="search"], input[name="q"], input[name="search"]');

  if (!searchInput) {
    // look for aria labelled stuff in English
    searchInput = document.querySelector('input[placeholder~="Search"], input[aria-label~="Search"], input[placeholder~="search"], input[aria-label~="Search"]');
  }

  return searchInput;
}

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement.tagName !== 'INPUT') {
    event.preventDefault();

    // probably add a default disabled list with things like github too
    chrome.storage.local.get(['disabledSites'], function(result) {
      const disabledSites = result.disabledSites || [];
      const currentSite = window.location.hostname;

      if (disabledSites.includes(currentSite)) {
        return;
      }

      const searchInput = findSearchBar();
      if (searchInput) {
        searchInput.focus();
      }
    });
  }
});
