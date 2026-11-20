// AqarDex widget gallery: builds the embed snippet and a live preview from fixed lists only.
(function () {
  'use strict';

  var LANGS = [
    ['en', 'English'],
    ['ar', 'Arabic'],
    ['ru', 'Russian'],
    ['zh', 'Chinese'],
    ['hi', 'Hindi'],
    ['tr', 'Turkish'],
  ];

  var PRODUCTS = {
    atlas: {
      name: 'Skyline Index',
      origin: 'https://skylineindex.com',
      hub: '/pulse',
      embed: '/pulse/embed',
      hubName: 'Dubai Market Pulse',
      wrapClass: 'skyline-index-embed',
      height: 560,
      frameStyle: 'border:1px solid #dbe2ef;border-radius:12px;display:block;max-width:100%;background:#ffffff;',
      creditColor: '#526077',
      datasets: [
        ['asks', 'Portal asking vs DLD gap'],
        ['yields', 'Net rental yield league'],
        ['momentum', '1Y price momentum leaders'],
      ],
    },
    offplan: {
      name: 'CraneScore',
      origin: 'https://cranescore.com',
      hub: '/progress',
      embed: '/progress/embed',
      hubName: 'Progress',
      wrapClass: 'cranescore-embed',
      height: 560,
      frameStyle: 'border:1px solid rgba(128,128,128,0.28);border-radius:10px;display:block;max-width:100%;background:transparent;',
      creditColor: '#64748b',
      datasets: [
        ['stages', 'Completion stages'],
        ['corridors', 'Top off-plan corridors'],
        ['schedule', 'DLD end-year pipeline'],
        ['plans', 'Payment-plan splits'],
      ],
    },
    value: {
      name: 'My Unit Worth',
      origin: 'https://myunitworth.com',
      hub: '/benchmarks',
      embed: '/benchmarks/embed',
      hubName: 'Dubai Home Value & Seller Benchmarks',
      wrapClass: 'myunitworth-embed',
      height: 460,
      frameStyle: 'border:0;border-radius:8px;display:block;max-width:100%;overflow:hidden;',
      creditColor: '#596573',
      datasets: [
        ['supply', 'Seller months of supply'],
        ['bands', 'Bedroom value bands'],
        ['handovers', 'Recent handover resales'],
      ],
    },
  };

  var productSel = document.getElementById('product');
  var datasetSel = document.getElementById('dataset');
  var langSel = document.getElementById('lang');
  var snippetBox = document.getElementById('snippet');
  var preview = document.getElementById('preview');
  var copyBtn = document.getElementById('copy');
  var copyStatus = document.getElementById('copy-status');

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function fill(select, entries) {
    select.textContent = '';
    entries.forEach(function (entry) {
      var option = document.createElement('option');
      option.value = entry[0];
      option.textContent = entry[1];
      select.appendChild(option);
    });
  }

  function pick(entries, value) {
    for (var i = 0; i < entries.length; i++) if (entries[i][0] === value) return entries[i];
    return entries[0];
  }

  function current() {
    var product = PRODUCTS[productSel.value] || PRODUCTS.atlas;
    var dataset = pick(product.datasets, datasetSel.value);
    var lang = pick(LANGS, langSel.value);
    return {
      product: product,
      dataset: dataset,
      lang: lang[0],
      embedUrl: product.origin + '/' + lang[0] + product.embed + '?dataset=' + dataset[0],
      hubUrl: product.origin + '/' + lang[0] + product.hub,
      title: product.name + ' — ' + product.hubName + ': ' + dataset[1],
      creditText: product.name + ' — ' + product.hubName,
    };
  }

  function snippet(w) {
    var p = w.product;
    return [
      '<div class="' + p.wrapClass + '" style="max-width:100%;margin:1rem 0;">',
      '  <iframe src="' + escapeHtml(w.embedUrl) + '" title="' + escapeHtml(w.title) + '" width="100%" height="' + p.height +
        '" style="' + p.frameStyle + '" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>',
      '  <p style="margin:0.5rem 0 0;font:12px/1.5 system-ui,-apple-system,sans-serif;color:' + p.creditColor + ';">Source: <a href="' +
        escapeHtml(w.hubUrl) + '" target="_blank" rel="noopener">' + escapeHtml(w.creditText) +
        '</a> (Dubai Land Department open data)</p>',
      '</div>',
    ].join('\n');
  }

  // The preview is built with DOM calls, not innerHTML, so the page's CSP can forbid inline styles and scripts.
  function renderPreview(w) {
    preview.textContent = '';
    var frame = document.createElement('iframe');
    frame.src = w.embedUrl;
    frame.title = w.title;
    frame.width = '100%';
    frame.height = String(w.product.height);
    frame.loading = 'lazy';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.className = 'preview-frame';

    var credit = document.createElement('p');
    credit.className = 'preview-credit';
    credit.appendChild(document.createTextNode('Source: '));
    var link = document.createElement('a');
    link.href = w.hubUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = w.creditText;
    credit.appendChild(link);
    credit.appendChild(document.createTextNode(' (Dubai Land Department open data)'));

    preview.appendChild(frame);
    preview.appendChild(credit);
  }

  function update() {
    var w = current();
    snippetBox.value = snippet(w);
    copyStatus.textContent = '';
    renderPreview(w);
    try {
      history.replaceState(null, '', '#' + productSel.value + '/' + w.dataset[0] + '/' + w.lang);
    } catch (e) {
      /* history can be unavailable in some embedded previews */
    }
  }

  function onProductChange() {
    fill(datasetSel, (PRODUCTS[productSel.value] || PRODUCTS.atlas).datasets);
    update();
  }

  function copy() {
    var text = snippetBox.value;
    var done = function () {
      copyStatus.textContent = 'Copied. Paste it into your page’s HTML.';
    };
    var fallback = function () {
      snippetBox.focus();
      snippetBox.select();
      copyStatus.textContent = 'Press Ctrl+C (Cmd+C on Mac) to copy.';
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  }

  fill(productSel, Object.keys(PRODUCTS).map(function (key) {
    return [key, PRODUCTS[key].name];
  }));
  fill(langSel, LANGS);

  // A shared link keeps its choice: #atlas/yields/ar
  var parts = (location.hash || '').replace(/^#/, '').split('/');
  if (PRODUCTS[parts[0]]) productSel.value = parts[0];
  fill(datasetSel, PRODUCTS[productSel.value].datasets);
  if (parts[1]) datasetSel.value = pick(PRODUCTS[productSel.value].datasets, parts[1])[0];
  if (parts[2]) langSel.value = pick(LANGS, parts[2])[0];

  productSel.addEventListener('change', onProductChange);
  datasetSel.addEventListener('change', update);
  langSel.addEventListener('change', update);
  copyBtn.addEventListener('click', copy);
  update();
})();
