  importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('restaurantReview').then(function(cache) {
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
       '/restaurant.html'
/*       '/restaurant.html?id=1',
       '/restaurant.html?id=2',
       '/restaurant.html?id=3',
       '/restaurant.html?id=4',
       '/restaurant.html?id=5',
       '/restaurant.html?id=6',
       '/restaurant.html?id=7',
       '/restaurant.html?id=8',
       '/restaurant.html?id=9',
       '/restaurant.html?id=10'  */
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
