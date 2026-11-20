(function () {
  var fab = document.getElementById('contactFab');
  var dlg = document.getElementById('contactDialog');
  if (!fab || !dlg) return;

  fab.addEventListener('click', function () {
    if (typeof dlg.showModal !== 'function') return;
    if (!dlg.open) dlg.showModal();
  });

  dlg.querySelectorAll('[data-close-contact]').forEach(function (btn) {
    btn.addEventListener('click', function () { dlg.close(); });
  });

  dlg.addEventListener('click', function (event) {
    var rect = dlg.getBoundingClientRect();
    var inside = event.clientX >= rect.left && event.clientX <= rect.right &&
                 event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) dlg.close();
  });
})();
