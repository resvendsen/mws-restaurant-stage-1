importScripts('/cache-polyfill.js');

const CACHE_NAME = 'restaurantReview';

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(CACHE_NAME)
    .then(function(cache) {
     console.log('Opened cache ', 'restaurantReview');
     return cache.addAll([
       '/',
       '/css/styles.css',
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
       '/index.html',
       '/js/dbhelper.js',
       '/js/main.js',
       '/js/restaurant_info.js',
       '/restaurant.html',
       '/restaurant.html?id=1',
       '/restaurant.html?id=2',
       '/restaurant.html?id=3',
       '/restaurant.html?id=4',
       '/restaurant.html?id=5',
       '/restaurant.html?id=6',
       '/restaurant.html?id=7',
       '/restaurant.html?id=8',
       '/restaurant.html?id=9',
       '/restaurant.html?id=10'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // cache hit - return response
        if (response) {
          return response;
        }

        // have to clone the request since it can only be consumed once and has already
        // been consumed by cache -- now it will be consumed by browser
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(function(response) {
            // check for valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // have to clone the response since it has been consumed by the browser and we
            // it also to be consumed alos by cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});
