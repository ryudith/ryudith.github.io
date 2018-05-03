function handleNotification (title, message, img) {
	var opts = {
		body: message,
		badge: '/hexa.png',
		icon: '/hexa.png',
		image: img || '/hexa.png',
		vibrate: [200, 100, 200, 100, 200, 100, 200],
		tag: 'test-sample',
		renotify: true,

		// code below must using serviceWorker
		actions: [  
			{action: 'like', title: 'Like'},
			{action: 'reply', title: 'Reply'}
		]
	};

	if (! ('Notification' in window)) {
		alert('Your Browser Not Support Notification !');
	} else if (Notification.permission === 'granted') {
		navigator.serviceWorker.ready.then(function(registration) {
			registration.showNotification(title, opts);
			// setTimeout(registration.close.bind(registration), 2000);
		});

	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
			navigator.serviceWorker.ready.then(function(registration) {
				registration.showNotification(title, opts);
				// setTimeout(registration.close.bind(registration), 2000);
			});
		});

	}
}


// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear
console.log("SW startup");

self.addEventListener('install', function (event) {
	var cacheName = 'test-pwa-cache';
	var urlCache = ['/', '/hexa.png'];

	event.waitUntil(caches.open(cacheName).then(function (cache) {
		console.log('opened cache');
		handleNotification('Info', 'PWA Opened Cache (Install).');
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