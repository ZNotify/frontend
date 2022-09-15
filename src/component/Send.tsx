import {useEffect, useState} from 'react';
import {Button, Card, Input, message, Modal} from "antd";
import 'antd/es/button/style';
import 'antd/es/card/style';
import 'antd/es/input/style';
import 'antd/es/modal/style';
import 'antd/es/message/style';
import {checkUser, sendNotify} from "../utils";
import TextArea from "antd/es/input/TextArea";
import {Client} from "znotify";
import {useLocalStorage} from "react-use";
import {API_ENDPOINT, WEB_PUSH_PUBLIC_KEY} from "../static";
import {getRegistration} from "../serviceWorkerRegistration";

function Send() {
    const [client, setClient] = useState<Client | null>(null);
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [long, setLong] = useState('');
    const [subscribed, setSubscribed] = useLocalStorage('subscribed', false);

    useEffect(() => {
        if (userId === "") {
            return
        }
        checkUser(userId).then((ret) => {
            setClient(ret)
        })
    }, [userId])

    function submit() {
        if (!client) {
            message.error("User ID is invalid.")
            return
        }
        if (!content) {
            message.error("Content can not be empty.")
            return
        }
        sendNotify(client, title, content, long).then(() => {
            message.success("Notification sent.")
        }).catch((e: Error) => {
            message.error(e.message)
        })
    }

    function subscribe() {
        if (subscribed) {
            console.warn("Already subscribed.")
            return
        }
        if (!client) {
            message.error("User ID is invalid.")
            return;
        }
        Modal.confirm({
            title: "Subscribe WebPush",
            content: "Do you really want to subscribe WebPush?\n\n" +
                "You will only receive notifications when browser is active.",
            onOk: async () => {
                if (Notification.permission !== "granted") {
                    const permission = await Notification.requestPermission();
                    if (permission !== "granted") {
                        message.error("Permission denied.")
                        return
                    }
                }
                const registration = await getRegistration()
                if (!registration) {
                    message.error("ServiceWorker is not registered.")
                    return
                }
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: WEB_PUSH_PUBLIC_KEY
                })
                if (!subscription) {
                    message.error("Get subscription failed.")
                    return
                }

                const resp = await fetch(`${API_ENDPOINT}/${userId}/web/sub`, {
                    method: "PUT",
                    body: JSON.stringify(subscription),
                })
                if (resp.ok) {
                    setSubscribed(true)
                    message.success("Subscribed.")
                } else {
                    message.error("Save subscription failed.")
                }
            },
            onCancel: () => {
            }
        })
    }

    return (
        <main>
            <Card
                title="Send Notification"
            >
                <Input.Group>
                    <div style={{width: "100%", display: "inline-flex"}}>
                        <Input
                            value={userId}
                            status={client ? '' : 'error'}
                            placeholder="User ID"
                            onChange={(e) => {
                                setUserId(() => e.target.value)
                            }}
                            style={{width: '30%'}}
                        />
                        <Input
                            value={title}
                            placeholder="Notification Title"
                            onChange={(e) => {
                                setTitle(() => e.target.value)
                            }}
                            style={{marginLeft: '16px', flexGrow: 1}}
                        />
                    </div>

                    <Input
                        value={content}
                        placeholder="Notification Content"
                        onChange={(e) => {
                            setContent(() => e.target.value)
                        }}
                        style={{width: '100%'}}
                    />
                    <TextArea
                        value={long}
                        placeholder="Notification Long Content"
                        onChange={(e) => {
                            setLong(() => e.target.value)
                        }}
                        rows={3}
                        style={{width: '100%'}}
                    />
                </Input.Group>
                <div style={{marginTop: '10px'}}>
                    {!subscribed && <Button
                        type="primary"
                        style={{float: 'left'}}
                        onClick={subscribe}
                    >Subscribe</Button>}

                    <Button
                        type="primary"
                        style={{float: 'right'}}
                        onClick={submit}
                    >Notify</Button>
                </div>
            </Card>
        </main>
    );
}

export default Send;
