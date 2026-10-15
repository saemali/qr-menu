(async function () {
  const root = document.getElementById('menu');
  const status = document.getElementById('status');
  try {
    const res = await fetch('menu.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('menu.json ' + res.status);
    const m = await res.json();
    document.title = (m.name || 'Menu') + ' · QR Menu';
    document.getElementById('name').textContent = m.name || '';
    const local = document.getElementById('name_local');
    if (m.name_local) { local.textContent = m.name_local; local.hidden = false; } else local.hidden = true;
    document.getElementById('tagline').textContent = m.tagline || '';
    const bits = [];
    if (m.address) bits.push(escapeHtml(m.address));
    if (m.hours) bits.push(escapeHtml(m.hours));
    if (m.maps_url) bits.push('<a class="map-link" href="' + escapeAttr(m.maps_url) + '" rel="noopener" target="_blank">Map</a>');
    if (m.phone) bits.push(escapeHtml(m.phone));
    document.getElementById('meta').innerHTML = bits.join(' · ');
    const cur = m.currency || '₹';
    const markIcon = (kind, label) =>
      '<i class="mark ' + kind + '" role="img" aria-label="' + label + '"></i>';
    let html = '<p class="legend">' +
      '<span>' + markIcon('veg', 'Vegetarian') + ' Veg</span>' +
      '<span>' + markIcon('nonveg', 'Non-vegetarian') + ' Non-veg</span>' +
      '<span>' + markIcon('egg', 'Contains egg') + ' Egg</span></p>';
    (m.categories || []).forEach(cat => {
      html += '<h2 class="cat">' + escapeHtml(cat.name || '') +
        (cat.name_local ? ' <span class="local">' + escapeHtml(cat.name_local) + '</span>' : '') + '</h2>';
      (cat.items || []).forEach(it => {
        const mark = (it.mark || 'veg').toLowerCase();
        const label = mark === 'nonveg' ? 'Non-vegetarian' : mark === 'egg' ? 'Contains egg' : 'Vegetarian';
        html += '<div class="item"><div>' + markIcon(mark, label) + '<span class="name">' +
          escapeHtml(it.name || '') + '</span>' +
          (it.name_local ? '<span class="local">' + escapeHtml(it.name_local) + '</span>' : '') +
          (it.desc ? '<p class="desc">' + escapeHtml(it.desc) + '</p>' : '') +
          '</div><div class="price">' + cur + Number(it.price || 0) + '</div></div>';
      });
    });
    if (m.note) html += '<p class="note">' + escapeHtml(m.note) + '</p>';
    root.innerHTML = html;
    status.textContent = '';
  } catch (e) {
    status.textContent = 'Could not load menu: ' + e.message;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function escapeAttr(s) { return escapeHtml(s).replace(/"/g, '&quot;'); }
})();
