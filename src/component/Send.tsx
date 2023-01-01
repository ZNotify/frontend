import React, {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {checkUser, sendNotify} from "../utils";
import {Client} from "znotify";
import {useLocalStorage} from "react-use";
import {WEB_PUSH_PUBLIC_KEY} from "../static";
import {getRegistration} from "../serviceWorkerRegistration";
import {
    AlertDialog, AlertDialogBody, AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogOverlay, Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea,
    useDisclosure,
    useToast
} from "@chakra-ui/react";

function Send() {
    const [client, setClient] = useState<Client | null>(null);
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [long, setLong] = useState('');
    const [subscribed, setSubscribed] = useLocalStorage('subscribed', false);
    const [deviceID] = useLocalStorage('deviceID', uuid());
    const toast = useToast();

    const {isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose} = useDisclosure()
    const cancelDialogRef = React.useRef<any>()

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
            toast({
                title: "User ID is invalid.",
                status: "error",
            })
            return
        }
        if (!content) {
            toast({
                title: "Content can not be empty.",
                status: "error",
            })
            return
        }
        sendNotify(client, title, content, long).then(() => {
            toast({
                title: "Notification sent.",
                status: "success",
            })
        }).catch((e: Error) => {
            toast({
                title: e.message,
                status: "error",
            })
        })
    }

    function subscribe() {
        if (subscribed) {
            console.warn("Already subscribed.")
            return
        }
        if (!client) {
            toast({
                title: "User ID is invalid.",
                status: "error",
            })
            return;
        }

        (async () => {
            if (Notification.permission !== "granted") {
                const permission = await Notification.requestPermission();
                if (permission !== "granted") {
                    // message.error("Permission denied.")
                    toast({
                        title: "Permission denied.",
                        status: "error",
                    })
                    return
                }
            }
            const registration = await getRegistration()
            if (!registration) {
                // message.error("ServiceWorker is not registered.")
                toast({
                    title: "ServiceWorker is not registered.",
                    status: "error",
                })

                return
            }
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: WEB_PUSH_PUBLIC_KEY
            })
            if (!subscription) {
                toast({
                    title: "Get subscription failed.",
                    status: "error",
                })
                return
            }

            client.register("WebPush", JSON.stringify(subscription), deviceID!)
                .then(() => {
                    setSubscribed(true)
                    // message.success("Subscribed.")
                    toast({
                        title: "Subscribed.",
                        status: "success",
                    })
                })
                .catch((e: Error) => {
                    console.error(e)
                    // message.error("Save subscription failed.")
                    toast({
                        title: "Save subscription failed.",
                        status: "error",
                    })
                })
        })()

    }

    return (
        <main>
            <Card>
                <CardHeader>Send Notification</CardHeader>
                <CardBody>
                    <div style={{width: "100%", display: "inline-flex"}}>
                        <Input
                            value={userId}
                            isInvalid={client === null}
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
                    <Textarea
                        value={long}
                        placeholder="Notification Long Content"
                        onChange={(e) => {
                            setLong(() => e.target.value)
                        }}
                        rows={3}
                        style={{width: '100%'}}
                    />
                </CardBody>
                <CardFooter
                    justifyContent={"space-between"}
                >
                    {!subscribed && <Button
                        onClick={subscribe}
                        disabled={!client}
                    >Subscribe</Button>}

                    <Button
                        onClick={submit}
                        disabled={(!client) || (!content)}
                    >Notify</Button>
                </CardFooter>
            </Card>
            <AlertDialog
                leastDestructiveRef={cancelDialogRef}
                isOpen={isDialogOpen}
                onClose={onDialogClose}
                closeOnEsc
                closeOnOverlayClick={true}
                isCentered>
                <AlertDialogOverlay/>
                <AlertDialogContent>
                    <AlertDialogHeader>Subscribe WebPush</AlertDialogHeader>
                    <AlertDialogCloseButton/>
                    <AlertDialogBody>
                        Do you really want to subscribe WebPush?
                        You will only receive notifications when browser is active.
                    </AlertDialogBody>
                    <Button ref={cancelDialogRef} onClick={onDialogClose}>
                        No
                    </Button>
                    <Button colorScheme='green' ml={3}>
                        Yes
                    </Button>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
}

export default Send;
