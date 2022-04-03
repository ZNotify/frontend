import {Client} from "znotify";

export function isDebug() {
    return process.env.NODE_ENV === 'development';
}

const BASE_URL = isDebug() ? 'http://localhost:14444' : ''

export async function checkUser(userId: string): Promise<Client | null> {
    try {
        return await Client.create(userId, BASE_URL);
    } catch (e) {
        return null;
    }
}

export async function sendNotify(client: Client, title: string, content: string, long: string): Promise<void> {
    try {
        await client.send(content, title, long);
    } catch (e) {
        console.log(e);
    }
}
