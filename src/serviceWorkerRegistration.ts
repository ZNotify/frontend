export async function getRegistration(): Promise<ServiceWorkerRegistration | undefined> {
    const regs = await navigator.serviceWorker.getRegistrations();
    if (regs.length === 0) {
        return undefined;
    }
    if (regs.length > 1) {
        console.warn("There are more than one service worker registrations");
        for (const reg of regs) {
            console.warn(reg);
        }
    }
    return regs[0];
}
