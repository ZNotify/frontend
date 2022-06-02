import {Button, Card} from "antd";
import ReactMarkdown from "react-markdown";
import {useParams} from "react-router-dom";
import {rfc3339toTimeStr} from "./utils";

function Show() {
    const {userID, long, msgID, title, createdAt, content} = useParams();

    if ([userID, long, msgID, title, createdAt, content].includes(undefined)) {
        return <main>
            <h1>Missing argument.</h1>
        </main>;
    }

    const timeString = rfc3339toTimeStr(createdAt!!);

    function close() {
        window.close();
    }

    function deleteMsg() {

    }

    return (
        <main>
            <Card
                title={title}
                style={{
                    maxWidth: "min(300px,40vw)"
                }}
            >
                <p>{content}</p>
                {long !== "" && <ReactMarkdown children={long!!}/>}
                <div style={{
                    height: "1em"
                }}/>
                <p
                    style={{
                        color: "gray"
                    }}
                >{timeString}</p>
            </Card>
            <div>
                <Button
                    type="primary"
                    style={{marginTop: '10px', float: 'left'}}
                >删除</Button>
                <Button
                    type="primary"
                    style={{marginTop: '10px', float: 'right'}}
                    onClick={close}
                >确定</Button>
            </div>

        </main>
    )
}

export default Show;
