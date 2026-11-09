// Bonat POS service worker - lets the app install and keep working offline
const CACHE = 'bonatpos-v1';
const CORE = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png',
              'icon-maskable-512.png', 'apple-touch-icon.png', 'favicon-48.png',
              'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js',
              'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(
    CORE.map(u => c.add(u).catch(() => {}))   // one failed file must not block install
  )).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const isPage = req.mode === 'navigate';
  if (isPage) {
    // Pages: try the network first (so updates arrive), fall back to the saved copy offline
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
    return;
  }
  // Everything else: saved copy first, then network (and save it for next time)
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res && (res.status === 200 || res.type === 'opaque')) {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
    }
    return res;
  }).catch(() => hit)));
});
