import ReactMarkdown from "react-markdown";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Client} from "znotify";
import {rfc3339toTimeStr} from "../utils";
import {API_ENDPOINT} from "../static";
import {Button, Card, CardBody, CardFooter, CardHeader} from "@chakra-ui/react";

function Show() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const userID = searchParams.get("userID");
    const msgID = searchParams.get("msgID");
    const title = searchParams.get("title") || "Notification";
    const createdAt = searchParams.get("createdAt");
    const content = searchParams.get("content");
    const long = searchParams.get("long");

    if ([userID, msgID, createdAt, content].includes(null)) {
        return <main>
            <h1>Missing argument.</h1>
        </main>;
    }

    const timeString = rfc3339toTimeStr(createdAt!!);

    function close() {
        navigate("/");
    }

    function deleteMsg() {
        Client.create(userID!!, API_ENDPOINT).then(c => c.delete(msgID!!)).then(() => {
            close()
        })
    }

    return (
        <main>
            <Card
                title={title}
                style={{
                    maxWidth: "min(600px,100vw)",
                    width: "90vw",
                    backgroundColor: "white",
                }}
            >
                <CardHeader>{content}</CardHeader>
                <CardBody>
                    {long !== "" && <ReactMarkdown children={long!!}/>}
                    <div style={{
                        height: "1em"
                    }}/>
                    <p
                        style={{
                            color: "gray"
                        }}
                    >{timeString}</p>
                </CardBody>
                <CardFooter>
                    <Button
                        colorScheme={"red"}
                        onClick={deleteMsg}
                        style={{marginTop: '10px', float: 'left'}}
                    >删除</Button>
                    <Button
                        style={{marginTop: '10px', float: 'right'}}
                        onClick={close}
                    >确定</Button>
                </CardFooter>
            </Card>
        </main>
    )
}

export default Show;
