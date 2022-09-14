const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/)
);

export function register() {
    if ('serviceWorker' in navigator) {
        const publicUrl = new URL(window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            return;
        }

        window.addEventListener('load', () => {
            registerValidSW();
        });
    }
}

function registerValidSW() {
    navigator.serviceWorker
        .register(new URL('serviceWorker.ts', import.meta.url))
        .catch((error) => {
        console.error('Error during service worker registration:', error);
    });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister().then(() => {
                    console.log('Service Worker unregistered');
                });
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}
