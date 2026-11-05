// Renders product cards from products.json
// Every "Shop / View" button uses the affiliate link for tracking

async function loadAndRenderProducts(category, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  try {
    const res = await fetch('products.json?t=' + Date.now());
    const data = await res.json();
    const list = data[category] || [];
    const affiliate = (data.settings && data.settings.affiliateLink) || 'https://jforce.jumia.co.ke/s/eeIzZkk';

    if (!list.length) {
      el.innerHTML = '<p style="text-align:center;color:#888">No products yet.</p>';
      return;
    }

    el.innerHTML = list.map(p => `
      <article class="product-card${p.featured ? ' featured' : ''}">
        ${p.badge ? `<div class="product-badge">${escapeHtml(p.badge)}</div>` : ''}
        <div class="product-img-wrap">
          <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" onerror="this.src='images/redmi-15c.jpg'">
        </div>
        <div class="product-body">
          <h3>${escapeHtml(p.name)}</h3>
          <p class="product-meta">${escapeHtml(p.meta || '')}</p>
          <p>${escapeHtml(p.description || '')}</p>
          <div class="product-actions">
            <a href="${escapeHtml(affiliate)}" class="btn ${p.featured ? 'btn-primary' : 'btn-outline'} btn-sm" target="_blank" rel="noopener">Shop on Jumia</a>
          </div>
        </div>
      </article>
    `).join('');
  } catch (e) {
    console.error(e);
    el.innerHTML = '<p style="text-align:center;color:#888">Could not load products. Check products.json.</p>';
  }
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
