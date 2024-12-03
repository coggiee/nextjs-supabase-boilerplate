/* eslint-disable no-console */
self.addEventListener("install", () => {
  // Service Worker 설치 시 수행할 작업
});

self.addEventListener("fetch", event => {
  const baseUrl = self.location.origin; // 현재 호스트의 기본 URL 가져오기
  const apiUrl = `${baseUrl}/api/image`; // API URL 생성
  
  if (event.request.url.startsWith(apiUrl)) {
    event.respondWith(
      caches.open("image-cache").then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request)
            .then(networkResponse => {
              if (!networkResponse.ok) {
                throw new Error("Network response was not ok");
              }
              const clonedResponse = networkResponse.clone();
              cache.put(event.request, clonedResponse);
              return networkResponse;
            })
            .catch(error => {
              console.error("Fetch failed:", error);
              return new Response("Error fetching the image", { status: 500 });
            });
        });
      }),
    );
  }
});
