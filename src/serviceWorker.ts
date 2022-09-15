/// <reference lib="WebWorker" />
// noinspection JSFileReferences

declare var self: ServiceWorkerGlobalScope


self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

interface MessageData {
    "id": string,
    "user_id": string,
    "title"?: string,
    "content": string,
    "long"?: string,
    "created_at": string,
}

self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json() as MessageData;
        const title = data.title;
        const content = data.content;
        event.waitUntil(self.registration.showNotification(title || "", {
            body: content,
            data: event.data.text(),
        }))
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(self.clients.matchAll({
        type: 'window'
    }).then(function (clientList) {
        for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            if (client.url === '/' && 'focus' in client) {
                return client.focus();
            }
        }
        const data = JSON.parse(event.notification.data) as MessageData;
        const query = new URLSearchParams();
        query.append('userID', data.user_id);
        query.append('msgID', data.id);
        if (data.title) {
            query.append('title', data.title);
        }
        query.append('createdAt', data.created_at);
        query.append('content', data.content);
        if (data.long) {
            query.append('long', data.long);
        }

        const url = `${location.origin}/#/show?${query.toString()}`;
        return self.clients.openWindow(url);
    }));
})
export default undefined;
