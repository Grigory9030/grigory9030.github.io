(() => {
  const key = 'gk-theme';
  const root = document.documentElement;
  const filePage = location.protocol === 'file:';
  const pageURL = new URL(location.href);
  function paint(theme) {
    const dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('.theme-toggle')?.setAttribute('aria-pressed', String(dark));
    // File URLs may have separate storage per document. Carry the choice on local navigation.
    if (filePage) {
      for (const link of document.querySelectorAll('[data-theme-link]')) {
        const url = new URL(link.href);
        url.searchParams.set('theme', root.dataset.theme);
        link.href = url.href;
      }
    }
  }
  function saveTheme(theme) {
    paint(theme);
    try { localStorage.setItem(key, root.dataset.theme); } catch {}
  }
  function restore() {
    try { paint(localStorage.getItem(key)); } catch { paint(root.dataset.theme); }
  }
  restore();
  const incoming = filePage && pageURL.searchParams.get('theme');
  if (incoming === 'dark' || incoming === 'light') {
    saveTheme(incoming);
    pageURL.searchParams.delete('theme');
    try { history.replaceState(null, '', pageURL.href); } catch {}
  }
  document.addEventListener('DOMContentLoaded', () => {
    paint(root.dataset.theme);
    document.querySelector('.theme-toggle').addEventListener('click', () => {
      saveTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  });
  window.addEventListener('storage', event => {
    if (event.key === key) paint(event.newValue);
  });
  window.addEventListener('pageshow', event => { if (event.persisted) restore(); });
})();
