(function () {
  var EMAIL = 'richard@seaglassdigital.co.uk';
  var overlay, form, nameInput, emailInput, businessInput, pendingSubject, lastFocused;

  function fieldWrap(input) {
    var el = input;
    while (el && !el.classList.contains('field')) el = el.parentElement;
    return el;
  }

  function setFieldError(input, hasError) {
    var field = fieldWrap(input);
    if (!field) return;
    field.classList.toggle('has-error', hasError);
    input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
  }

  function buildModal() {
    overlay = document.createElement('div');
    overlay.className = 'enquiry-overlay';
    overlay.id = 'enquiry-overlay';
    overlay.hidden = true;
    overlay.innerHTML =
      '<div class="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">' +
        '<button type="button" class="enquiry-close" aria-label="Close">&times;</button>' +
        '<h2 id="enquiry-title">Tell us a bit about you</h2>' +
        '<p class="enquiry-sub">Three quick details and we’ll come back to you personally.</p>' +
        '<form class="enquiry-form" novalidate>' +
          '<div class="field">' +
            '<label for="enquiry-name">Name</label>' +
            '<input type="text" id="enquiry-name" name="name" autocomplete="name" placeholder="Jane Smith" required>' +
            '<span class="enquiry-field-error" role="alert">Please enter your name.</span>' +
          '</div>' +
          '<div class="field">' +
            '<label for="enquiry-email">Email</label>' +
            '<input type="email" id="enquiry-email" name="email" autocomplete="email" placeholder="jane@yourbusiness.co.uk" required>' +
            '<span class="enquiry-field-error" role="alert">Please enter a valid email address.</span>' +
          '</div>' +
          '<div class="field">' +
            '<label for="enquiry-business">Business details</label>' +
            '<textarea id="enquiry-business" name="business" autocomplete="organization" rows="3" placeholder="Business name, and what you’d like help with" required></textarea>' +
            '<span class="enquiry-field-error" role="alert">Please tell us a little about your business.</span>' +
          '</div>' +
          '<p class="enquiry-privacy">Used only to reply to your enquiry, business to business. No marketing, no mailing list, no third parties.</p>' +
          '<button type="submit" class="btn btn-primary enquiry-submit">Send enquiry</button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(overlay);

    form = overlay.querySelector('form');
    nameInput = overlay.querySelector('#enquiry-name');
    emailInput = overlay.querySelector('#enquiry-email');
    businessInput = overlay.querySelector('#enquiry-business');

    overlay.querySelector('.enquiry-close').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !overlay.hidden) closeModal();
    });
    form.addEventListener('submit', handleSubmit);
    [nameInput, emailInput, businessInput].forEach(function (input) {
      input.addEventListener('input', function () { setFieldError(input, false); });
    });
  }

  function openModal(subject) {
    pendingSubject = subject || 'General enquiry';
    lastFocused = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add('enquiry-open');
    window.setTimeout(function () { nameInput.focus(); }, 10);
  }

  function closeModal() {
    overlay.hidden = true;
    document.body.classList.remove('enquiry-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    var valid = true;

    if (!nameInput.value.trim()) { setFieldError(nameInput, true); valid = false; }
    if (!emailInput.value.trim() || !emailInput.checkValidity()) { setFieldError(emailInput, true); valid = false; }
    if (!businessInput.value.trim()) { setFieldError(businessInput, true); valid = false; }

    if (!valid) {
      var firstInvalid = overlay.querySelector('.has-error input, .has-error textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var body = 'Name: ' + nameInput.value.trim() + '\n' +
      'Email: ' + emailInput.value.trim() + '\n\n' +
      'Business details:\n' + businessInput.value.trim();

    var mailto = 'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent(pendingSubject) +
      '&body=' + encodeURIComponent(body);

    window.location.href = mailto;
    closeModal();
    form.reset();
  }

  function extractSubject(href) {
    var match = /subject=([^&]*)/.exec(href);
    return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : '';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('a[href^="mailto:richard@seaglassdigital.co.uk"]');
    if (!links.length) return;
    buildModal();
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(extractSubject(link.getAttribute('href')));
      });
    });
  });
})();
