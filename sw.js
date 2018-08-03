//Install service worker and add files to chache storage.
let serviceCache = 'restaurant-05'
self.addEventListener('install', (event) => {
  event.waitUntil(
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
  )
});


//Activate service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('restaurant-') &&
            cacheName != serviceCache;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

//Make service worker to start fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    /*Pass promise at caches.match(). This method checks
    request and find resulf of cached that was made by Service worker*/
    caches.match(event.request).then((response) => {
      if(response) {
        console.log('Found cache: ', event.request.url);
        return response;
      }

      //Clone request for fetch.
      let requestClone = event.request.clone();

      return fetch(requestClone).then((response) => {
        //Pass response to browser
        if(!response || response.status !== 200 || response.type !== 'basic') {
          console.log('No response : status is not 200 or type is not basic');
          return response;
        }
        /*Clone response because browser needs to return response
        and pass cache.*/
        let responseToCache = response.clone();
        return caches.open(serviceCache).then((cache) => {
          //Pass response(clone) to cache
          cache.put(event.request, responseToCache);
          return response;
        }).catch((error) => {
          console.log('Service worker error')
        })
      })
    })
  );
});
