/* ================================================
   MILLIE'S - Dropdowns and calendar in the site's look
   Replaces the browser's own <select> lists and date
   pickers, which can't be styled, with cream/brown ones.
   The original fields stay in the form (hidden) so the
   form still sends the same values and validation in
   main.js keeps working.

   Date fields:
     data-days="3,4,5,6"  only allow these weekdays
                          (0 = Sunday ... 6 = Saturday)
     past dates are never allowed
   ================================================ */
(function () {
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  var open = null; // the picker that is currently open

  function closeOpen() {
    if (!open) return;
    open.panel.hidden = true;
    open.trigger.setAttribute('aria-expanded', 'false');
    open = null;
  }

  function openPicker(p) {
    if (open && open !== p) closeOpen();
    p.panel.hidden = false;
    p.trigger.setAttribute('aria-expanded', 'true');
    open = p;
  }

  document.addEventListener('click', function (e) {
    if (open && !open.wrap.contains(e.target)) closeOpen();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && open) {
      var t = open.trigger;
      closeOpen();
      t.focus();
    }
  });

  /* The hidden original field gets .error from main.js; show it on the trigger */
  function mirrorError(field, trigger) {
    new MutationObserver(function () {
      trigger.classList.toggle('error', field.classList.contains('error'));
    }).observe(field, { attributes: true, attributeFilter: ['class'] });
  }

  function pointLabel(field, trigger) {
    var label = document.querySelector('label[for="' + field.id + '"]');
    trigger.id = field.id + '-picker';
    if (label) label.htmlFor = trigger.id;
  }

  /* ---------- Dropdown ---------- */
  function enhanceSelect(select) {
    var wrap = document.createElement('div');
    wrap.className = 'picker';
    select.parentNode.insertBefore(wrap, select);
    wrap.appendChild(select);

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'picker__trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    var list = document.createElement('ul');
    list.className = 'picker__panel picker__list';
    list.setAttribute('role', 'listbox');
    list.hidden = true;

    var p = { wrap: wrap, trigger: trigger, panel: list };
    var options = Array.prototype.filter.call(select.options, function (o) { return o.value !== ''; });
    var placeholder = select.options[0] && select.options[0].value === '' ? select.options[0].text : 'select';

    function render() {
      var chosen = select.value;
      trigger.textContent = chosen ? select.options[select.selectedIndex].text : placeholder;
      trigger.classList.toggle('is-empty', !chosen);
      Array.prototype.forEach.call(list.children, function (li) {
        li.setAttribute('aria-selected', li.dataset.value === chosen ? 'true' : 'false');
      });
    }

    function choose(value) {
      select.value = value;
      select.classList.remove('error');
      select.dispatchEvent(new Event('change', { bubbles: true }));
      render();
      closeOpen();
      trigger.focus();
    }

    options.forEach(function (o) {
      var li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.tabIndex = -1;
      li.dataset.value = o.value;
      li.textContent = o.text;
      li.addEventListener('click', function () { choose(o.value); });
      li.addEventListener('keydown', function (e) {
        var items = list.children, i = Array.prototype.indexOf.call(items, li);
        if (e.key === 'ArrowDown') { e.preventDefault(); (items[i + 1] || li).focus(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); (items[i - 1] || li).focus(); }
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(o.value); }
        if (e.key === 'Tab') closeOpen();
      });
      list.appendChild(li);
    });

    function show() {
      openPicker(p);
      var sel = list.querySelector('[aria-selected="true"]') || list.firstChild;
      if (sel) { sel.focus(); list.scrollTop = sel.offsetTop - list.clientHeight / 2; }
    }

    trigger.addEventListener('click', function () { list.hidden ? show() : closeOpen(); });
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); show(); }
    });

    select.classList.add('picker__native');
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');
    pointLabel(select, trigger);
    mirrorError(select, trigger);
    wrap.appendChild(trigger);
    wrap.appendChild(list);
    render();
  }

  /* ---------- Calendar ---------- */
  function iso(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function enhanceDate(input) {
    var allowed = input.dataset.days ? input.dataset.days.split(',').map(Number) : null;
    var today = new Date(); today.setHours(0, 0, 0, 0);

    var wrap = document.createElement('div');
    wrap.className = 'picker';
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
    input.type = 'hidden';

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'picker__trigger picker__trigger--date';
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-expanded', 'false');

    var panel = document.createElement('div');
    panel.className = 'picker__panel picker__cal';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Choose a date');
    panel.hidden = true;

    var p = { wrap: wrap, trigger: trigger, panel: panel };
    var view = new Date(today.getFullYear(), today.getMonth(), 1);

    function ok(d) {
      return d >= today && (!allowed || allowed.indexOf(d.getDay()) !== -1);
    }

    function label() {
      if (!input.value) {
        trigger.textContent = 'choose a date';
        trigger.classList.add('is-empty');
        return;
      }
      var d = new Date(input.value + 'T00:00:00');
      trigger.textContent = DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()].toLowerCase() + ' ' + d.getDate();
      trigger.classList.remove('is-empty');
    }

    function draw(focusIso) {
      var y = view.getFullYear(), m = view.getMonth();
      var first = new Date(y, m, 1).getDay();
      var count = new Date(y, m + 1, 0).getDate();
      var atStart = y === today.getFullYear() && m === today.getMonth();

      var html = '<div class="picker__cal-head">' +
        '<button type="button" class="picker__nav" data-step="-1" aria-label="Previous month"' + (atStart ? ' disabled' : '') + '>&lsaquo;</button>' +
        '<span class="picker__month">' + MONTHS[m].toLowerCase() + ' ' + y + '</span>' +
        '<button type="button" class="picker__nav" data-step="1" aria-label="Next month">&rsaquo;</button></div>' +
        '<div class="picker__grid">' +
        DAYS.map(function (n) { return '<span class="picker__dow">' + n.charAt(0) + '</span>'; }).join('');
      for (var i = 0; i < first; i++) html += '<span></span>';
      for (var day = 1; day <= count; day++) {
        var d = new Date(y, m, day), v = iso(d), can = ok(d);
        html += '<button type="button" class="picker__day' +
          (v === input.value ? ' is-chosen' : '') + (v === iso(today) ? ' is-today' : '') + '"' +
          ' data-date="' + v + '"' + (can ? '' : ' disabled') +
          ' aria-label="' + DAYS[d.getDay()] + ' ' + MONTHS[m] + ' ' + day + (can ? '' : ', unavailable') + '">' + day + '</button>';
      }
      html += '</div>';
      if (allowed) html += '<p class="picker__note">pickups are wednesday &ndash; saturday</p>';
      panel.innerHTML = html;

      var target = focusIso && panel.querySelector('[data-date="' + focusIso + '"]:not([disabled])');
      if (target) target.focus();
    }

    panel.addEventListener('click', function (e) {
      var nav = e.target.closest('.picker__nav');
      if (nav) {
        view.setMonth(view.getMonth() + Number(nav.dataset.step));
        draw();
        panel.querySelector('.picker__nav[data-step="' + nav.dataset.step + '"]').focus();
        return;
      }
      var dayBtn = e.target.closest('.picker__day');
      if (dayBtn && !dayBtn.disabled) {
        input.value = dayBtn.dataset.date;
        input.classList.remove('error');
        label();
        closeOpen();
        trigger.focus();
      }
    });

    panel.addEventListener('keydown', function (e) {
      var cur = document.activeElement;
      if (!cur || !cur.classList.contains('picker__day')) return;
      var step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
      if (!step) return;
      e.preventDefault();
      var d = new Date(cur.dataset.date + 'T00:00:00');
      d.setDate(d.getDate() + step);
      if (d.getMonth() !== view.getMonth()) { view = new Date(d.getFullYear(), d.getMonth(), 1); }
      draw(iso(d));
    });

    trigger.addEventListener('click', function () {
      if (!panel.hidden) { closeOpen(); return; }
      if (input.value) { var c = new Date(input.value + 'T00:00:00'); view = new Date(c.getFullYear(), c.getMonth(), 1); }
      draw();
      openPicker(p);
      var focusBtn = panel.querySelector('.picker__day.is-chosen') || panel.querySelector('.picker__day:not([disabled])');
      if (focusBtn) focusBtn.focus();
    });

    pointLabel(input, trigger);
    mirrorError(input, trigger);
    wrap.appendChild(trigger);
    wrap.appendChild(panel);
    label();
  }

  function init() {
    document.querySelectorAll('select.form__select').forEach(enhanceSelect);
    document.querySelectorAll('input[type="date"].form__input').forEach(enhanceDate);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
