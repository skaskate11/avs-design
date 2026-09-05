const PACKAGE_IMAGES = {
  standard: 'assets/package-standard.webp?v=16',
  comfort: 'assets/package-comfort.webp?v=16',
  plus: 'assets/package-plus.webp?v=16'
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
  const src = PACKAGE_IMAGES[key];
  if (!src) throw new Error('Unknown package: ' + key);

  packageImageCache[key] = new Promise((resolve, reject) => {
    const preloader = new Image();
    preloader.onload = () => resolve(src);
    preloader.onerror = () => reject(new Error('Failed to load ' + src));
    preloader.src = src;
  });
  return packageImageCache[key];
}

async function showPackagePreview(key) {
  const image = document.getElementById('variantImage');
  const panel = document.querySelector('.variant-panel');
  if (!image || !panel || !PACKAGE_IMAGES[key]) return;

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
  .variant-tabs{width:100%;margin-left:auto;margin-right:auto}
  .variant-panel.avs-showcase{display:block;width:100%;margin-left:auto;margin-right:auto;background:#f8f2e8;border-radius:28px;overflow:hidden}
  .variant-panel.avs-showcase .variant-photo{height:auto;aspect-ratio:1672/941;background:#eee5d7;overflow:hidden;display:grid;place-items:center}
  .variant-panel.avs-showcase .variant-photo img{width:100%;height:100%;object-fit:contain;display:block;background:#f8f2e8;transition:opacity .18s ease;image-rendering:auto}
  .variant-panel.avs-showcase .variant-photo img.is-loading{opacity:.42}
  .variant-panel.avs-showcase .variant-copy{padding:16px 22px 18px;display:flex;align-items:center;justify-content:flex-end;min-height:68px;background:#fffaf2}
  .variant-panel.avs-showcase .variant-copy > *:not(.variant-cta){display:none!important}
  .variant-panel.avs-showcase .variant-cta{margin:0;align-self:auto}
  @media(max-width:720px){
    .variant-panel.avs-showcase{border-radius:20px}
    .variant-panel.avs-showcase .variant-photo{aspect-ratio:1672/941}
    .variant-panel.avs-showcase .variant-copy{padding:12px}
    .variant-panel.avs-showcase .variant-cta{width:100%;text-align:center}
  }
`;
document.head.appendChild(showcaseStyle);

document.querySelectorAll('.variant-tab').forEach(button => {
  button.addEventListener('click', () => showPackagePreview(button.dataset.variant));
});

showPackagePreview('standard');
