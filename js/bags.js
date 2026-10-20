/* ================================================
   MILLIE'S - Bag counter on the pickup form
   Bags are prepackaged, so the order is just how many
   of each size. Fills the hidden "order_summary" field
   (e.g. "2 x 1/4 lb bag, 1 x 1 lb bag"); it is required,
   so main.js flags the order when no bags are chosen.
   ================================================ */
(function () {
  var MAX = 20;

  function init() {
    var group = document.querySelector('.bags');
    var summary = document.getElementById('order-summary');
    if (!group || !summary) return;
    var rows = group.querySelectorAll('.bag-row');

    function update() {
      var parts = [];
      rows.forEach(function (row) {
        var input = row.querySelector('.stepper__count');
        var n = parseInt(input.value, 10);
        n = isNaN(n) ? 0 : Math.max(0, Math.min(MAX, n));
        input.value = n;
        row.classList.toggle('is-picked', n > 0);
        row.querySelector('[data-step="-1"]').disabled = n === 0;
        if (n > 0) parts.push(n + ' x ' + row.querySelector('.bag-row__size').textContent);
      });
      summary.value = parts.join(', ');
      if (summary.value) summary.classList.remove('error');
    }

    rows.forEach(function (row) {
      var input = row.querySelector('.stepper__count');
      row.querySelectorAll('.stepper__btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          input.value = (parseInt(input.value, 10) || 0) + Number(btn.dataset.step);
          update();
        });
      });
      input.addEventListener('change', update);
      input.addEventListener('focus', function () { input.select(); });
    });

    // main.js marks the hidden summary field; show that on the bag group
    new MutationObserver(function () {
      group.classList.toggle('error', summary.classList.contains('error'));
    }).observe(summary, { attributes: true, attributeFilter: ['class'] });

    update();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
