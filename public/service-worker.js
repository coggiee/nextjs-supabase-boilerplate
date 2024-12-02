/* eslint-disable no-console */
function registerServiceWorker() {
  if (typeof window !== "undefined") {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker Registered");
    }
  }
}

registerServiceWorker();
