const CACHE_NAME = "AfterSchoolCache-v1";
const urlsToCache = [
  "/index.html",
  "/public/style.css",
  "/afterschool.webmanifest",
  "/fontawesome.js",
  "/server.js", // Optional: this is backend, usually not cached unless needed
  "/images/Coding.jpg",
  "/images/Cricket.jpg",
  "/images/Dance.jpg",
  "/images/Gardening.jpg",
  "/images/Karate.jpg",
  "/images/logo.svg",
  "/images/Painting.jpg",
  "/images/Piano.jpg",
  "/images/Pottery.png",
  "/images/Swimming.jpg",
  "/images/Yoga.jpg",
];

// Install event: cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event: serve cached content
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match("/index.html"); // Optional fallback
      })
  );
});
