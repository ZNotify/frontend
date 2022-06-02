import {Client} from "znotify";

export function isDebug() {
    return process.env.NODE_ENV === 'development';
}

const API_ENDPOINT = isDebug() ? 'http://localhost:14444' : ''

export async function checkUser(userId: string): Promise<Client | null> {
    try {
        return await Client.create(userId, API_ENDPOINT);
    } catch (e) {
        return null;
    }
}

export async function sendNotify(client: Client, title: string, content: string, long: string): Promise<void> {
    try {
        await client.send(content, title, long);
    } catch (e) {
        console.error(e);
    }
}

export function rfc3339toTimeStr(rfc3339: string): string {
    const date = new Date(rfc3339);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
