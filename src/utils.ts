import {Client} from "znotify";
import {API_ENDPOINT} from "./static";

export function isDebug() {
    return import.meta.env.NODE_ENV === 'development';
}

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
    return `${date.getFullYear()}年` +
        `${(numberPadZero(date.getMonth() + 1))}月` +
        `${numberPadZero(date.getDate())}日 ` +
        `${numberPadZero(date.getHours())}:` +
        `${numberPadZero(date.getMinutes())}:` +
        `${numberPadZero(date.getSeconds())}`;
}

function numberPadZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
}
