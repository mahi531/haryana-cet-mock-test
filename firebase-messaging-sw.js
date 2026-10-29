/* Firebase Messaging service worker for HSSC Mock Test Wala.
   Keep this file at the repository root beside index.html. */
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDAt-Ck6dQwo0EQ8Ila_my9aGt8giLfdV8",
  authDomain: "hssc-mock-test-wala.firebaseapp.com",
  projectId: "hssc-mock-test-wala",
  storageBucket: "hssc-mock-test-wala.firebasestorage.app",
  messagingSenderId: "1082414054403",
  appId: "1:1082414054403:web:de1593aae9a733344e2236",
  measurementId: "G-LGHVK5RYE9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};
  const title = (payload.notification && payload.notification.title) || data.title || "HSSC Mock Test Wala";
  const options = {
    body: (payload.notification && payload.notification.body) || data.body || "नया Mock Test उपलब्ध है।",
    icon: "./192.png",
    badge: "./192.png",
    data: { url: data.url || "./index.html" }
  };
  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL((event.notification.data && event.notification.data.url) || "./index.html", self.location.origin).href;
  event.waitUntil((async () => {
    const windows = await clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of windows) {
      if (client.url === targetUrl && "focus" in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow(targetUrl);
  })());
});
