/* OneSignal Web Push service worker.
   This worker is intentionally in its own /onesignal/ scope.
   Do not replace the existing root-level sw.js used by the PWA. */
importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');
