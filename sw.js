/* change: This js file has service worker codes.  */

self.addEventListener('install', function(ev) {
  ev.waitUntil(
    caches.open('servicew')
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll([
          '/',
          'css/style.css',
          'js/main.js',
          'js/restaurant_info.js',
          '/index.html',
          '/restaurant.html',
          '/data/restaurants.json',
          '/img/1.jpg',
          '/img/2.jpg',
          '/img/3.jpg',
          '/img/4.jpg',
          '/img/5.jpg',
          '/img/6.jpg',
          '/img/7.jpg',
          '/img/8.jpg',
          '/img/9.jpg',
          '/img/10.jpg',
          //'https://maps.googleapis.com/maps/api/js'
        ]);
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
