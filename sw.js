// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear
console.log("SW startup");
// console.log(self.navigator.serviceWorker.ready.then);

self.addEventListener('install', function (event) {
	var cacheName = 'test-pwa-cache';
	var urlCache = ['/', '/hexa.png'];

	event.waitUntil(caches.open(cacheName).then(function (cache) {
		console.log('opened cache');
		return cache.addAll(urlCache);
	}));
});

self.addEventListener('activate', function(event) {
	console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
	console.log("Caught a fetch!");
	event.respondWith(new Response("Hello world!"));
});