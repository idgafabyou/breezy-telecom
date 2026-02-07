self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("breezy-cache").then(cache => {
      return cache.addAll([
        "/",
        "/style.css",
        "/app.js"
      ]);
    })
  );
});
