(function () {
  var lang = document.documentElement.lang === 'en' ? 'en' : 'zh';
  var MSG = {
    zh: {
      sending: '发送中…',
      ok: '已收到，我们会尽快联系你。',
      err: '发送失败，请稍后重试，或直接发邮件到 mwwz@qq.com。'
    },
    en: {
      sending: 'Sending...',
      ok: 'Thanks — we will get back to you soon.',
      err: 'Something went wrong. Please try again, or email mwwz@qq.com.'
    }
  };

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

  var form = document.getElementById('contactForm');
  var status = document.getElementById('contactStatus');
  var submit = document.getElementById('contactSubmit');
  if (!form || !status || !submit) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    var fd = new FormData(form);
    var data = {
      name: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      company: String(fd.get('company') || '').trim(),
      message: String(fd.get('message') || '').trim(),
      website: String(fd.get('website') || '')
    };

    submit.disabled = true;
    status.textContent = MSG[lang].sending;

    fetch('https://auth.mwwztech.com/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (res) {
      return res.json().then(function (body) { return { ok: res.ok, body: body }; });
    }).then(function (r) {
      if (!r.ok || !r.body.ok) throw new Error((r.body && r.body.error) || 'failed');
      form.reset();
      status.textContent = MSG[lang].ok;
    }).catch(function () {
      status.textContent = MSG[lang].err;
    }).finally(function () {
      submit.disabled = false;
    });
  });
})();
