/* change: This js file has service worker codes.  */
self.addEventListener('install', function(ev) {
  ev.waitUntil(
    caches.open('test01')
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll([
          '/skeleton',
          'js/main.js',
          'css/style.css',
          'js/restaurant_info.js'
        ]);
      })
  );
});

self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);
  if(requestUrl.origin === location.origin) {
    if(requestUrl.pathname === '/') {
      event.respondWith(caches.match('/skeleton'));
      return;
    }
  }
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
