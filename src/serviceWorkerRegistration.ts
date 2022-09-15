export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register(import.meta.env.BASE_URL + "serviceWorker.js")
                .catch((error) => {
                    console.error('Error during service worker registration:', error);
                });
        });
    }
}

export async function getRegistration() {
    return await navigator.serviceWorker.getRegistration(import.meta.env.BASE_URL + "serviceWorker.js");
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
