(function () {
  var rail = document.getElementById('contactRail');
  if (!rail) return;

  var items = Array.prototype.slice.call(rail.querySelectorAll('.contact-rail-item'));

  function closeAll(except) {
    items.forEach(function (item) {
      if (item === except) return;
      item.classList.remove('open');
      var btn = item.querySelector('.contact-rail-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  items.forEach(function (item) {
    var btn = item.querySelector('.contact-rail-btn');
    if (!btn) return;
    btn.addEventListener('click', function (event) {
      event.stopPropagation();
      var willOpen = !item.classList.contains('open');
      closeAll(item);
      item.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  document.addEventListener('click', function (event) {
    if (!rail.contains(event.target)) closeAll(null);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeAll(null);
  });
})();
