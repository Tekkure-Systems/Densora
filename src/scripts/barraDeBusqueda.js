document.addEventListener('DOMContentLoaded', () => {
  const initSearchBar = () => {
  const searchButton = document.getElementById('toggle-search');
  const searchBar = document.getElementById('search-bar');
  const iconBar = document.getElementById('icon-bar');
  const searchInput = document.getElementById('search-input');
  const clearSearch = document.getElementById('clear-search');

  if (!searchButton || !searchBar || !iconBar) return;

  searchButton.addEventListener('click', (e) => {
    e.stopPropagation();
    iconBar.classList.add('hidden');
    searchBar.classList.remove('hidden');
    searchInput?.focus();
  });

  clearSearch?.addEventListener('click', (e) => {
    e.stopPropagation();
    searchInput.value = '';
    searchBar.classList.add('hidden');
    iconBar.classList.remove('hidden');
  });

  document.addEventListener('click', (e) => {
    const isInside = searchBar.contains(e.target) || searchButton.contains(e.target);
    if (!isInside && !searchBar.classList.contains('hidden')) {
      searchInput.value = '';
      searchBar.classList.add('hidden');
      iconBar.classList.remove('hidden');
    }
  });
};

// Detectar reinicios de la SPA con astro:transitions
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSearchBar);
} else {
  initSearchBar();
}
});
