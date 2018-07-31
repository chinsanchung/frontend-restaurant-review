/* change: This js file has service worker codes.  */
let serviceCache = 'restaurant-04'
self.addEventListener('install', function(event) {

    caches.open(serviceCache).then((cache) => {
      return cache.addAll([
        'restaurant.html',
        'index.html',
        'js/main.js',
        'js/restaurant_info.js',
        'css/styles.css',
        'sw.js',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg'
      ]).then(() => self.skipWaiting());
    })

});

//Make service worker to have fetch event
self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.open(serviceCache).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

//Activate service worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
            cacheName != serviceCache;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
