const PACKAGE_IMAGE_PARTS = {
  standard: [
    'assets/package-standard.1.b64',
    'assets/package-standard.2.b64',
    'assets/package-standard.3.b64',
    'assets/package-standard.4.b64',
    'assets/package-standard.5.b64'
  ],
  comfort: [
    'assets/package-comfort.1.b64',
    'assets/package-comfort.2.b64',
    'assets/package-comfort.3.b64',
    'assets/package-comfort.4.b64'
  ],
  plus: [
    'assets/package-plus.1.b64',
    'assets/package-plus.2.b64',
    'assets/package-plus.3.b64'
  ]
};

const PACKAGE_NAMES = {
  standard: 'Стандарт',
  comfort: 'Комфорт',
  plus: 'Комфорт+'
};

const packageImageCache = {};
let packagePreviewRequest = 0;

async function loadPackageImage(key) {
  if (packageImageCache[key]) return packageImageCache[key];
  const files = PACKAGE_IMAGE_PARTS[key];
  if (!files) throw new Error('Unknown package: ' + key);

  const parts = await Promise.all(files.map(async path => {
    const response = await fetch(path + '?v=12');
    if (!response.ok) throw new Error('Failed to load ' + path);
    return (await response.text()).trim();
  }));

  const src = 'data:image/webp;base64,' + parts.join('');
  packageImageCache[key] = src;
  return src;
}

async function showPackagePreview(key) {
  const image = document.getElementById('variantImage');
  const panel = document.querySelector('.variant-panel');
  if (!image || !panel || !PACKAGE_IMAGE_PARTS[key]) return;

  const requestId = ++packagePreviewRequest;
  panel.classList.add('avs-showcase');
  image.classList.add('is-loading');

  try {
    const src = await loadPackageImage(key);
    if (requestId !== packagePreviewRequest) return;
    image.src = src;
    image.alt = 'Визуальная концепция ремонта «' + PACKAGE_NAMES[key] + '»: гостиная, кухня, спальня и санузел';
    image.style.display = 'block';
    image.parentElement.classList.remove('variant-photo--fallback');
  } catch (error) {
    console.error('AVS package preview:', error);
  } finally {
    if (requestId === packagePreviewRequest) image.classList.remove('is-loading');
  }
}

const showcaseStyle = document.createElement('style');
showcaseStyle.textContent = `
  .variant-panel.avs-showcase{display:block;background:#f8f2e8;border-radius:28px;overflow:hidden}
  .variant-panel.avs-showcase .variant-photo{height:auto;aspect-ratio:16/9;background:#eee5d7;overflow:hidden}
  .variant-panel.avs-showcase .variant-photo img{width:100%;height:100%;object-fit:contain;display:block;background:#f8f2e8;transition:opacity .18s ease}
  .variant-panel.avs-showcase .variant-photo img.is-loading{opacity:.42}
  .variant-panel.avs-showcase .variant-copy{padding:16px 22px 18px;display:flex;align-items:center;justify-content:flex-end;min-height:68px;background:#fffaf2}
  .variant-panel.avs-showcase .variant-copy > *:not(.variant-cta){display:none!important}
  .variant-panel.avs-showcase .variant-cta{margin:0;align-self:auto}
  @media(max-width:720px){
    .variant-panel.avs-showcase{border-radius:20px}
    .variant-panel.avs-showcase .variant-photo{aspect-ratio:16/9}
    .variant-panel.avs-showcase .variant-copy{padding:12px}
    .variant-panel.avs-showcase .variant-cta{width:100%;text-align:center}
  }
`;
document.head.appendChild(showcaseStyle);

document.querySelectorAll('.variant-tab').forEach(button => {
  button.addEventListener('click', () => showPackagePreview(button.dataset.variant));
});

showPackagePreview('standard');
