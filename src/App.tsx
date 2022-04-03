// noinspection JSIgnoredPromiseFromCall

import React, {useEffect} from 'react';
import './App.css';
import {Button, Card, Input, message} from "antd";
import {checkUser, sendNotify} from "./Utils";
import TextArea from "antd/es/input/TextArea";
import {Client} from "znotify";

function App() {
    const [client, setClient] = React.useState<Client | null>(null);
    const [userId, setUserId] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [long, setLong] = React.useState('');

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
                <Button
                    type="primary"
                    style={{marginTop: '10px', float: 'right'}}
                    onClick={submit}
                >Notify</Button>
            </Card>
        </main>
    );
}

export default App;
