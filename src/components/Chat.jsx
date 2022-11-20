import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";


const Chat = () => {

    const { data } = useContext(ChatContext);


    return (
        <div className="chat">
            <div className="chatInfo">
                {data.contact.photoURL ? <img src={data.contact.photoURL} alt="" /> : null}
                <span>{data.contact?.displayName}</span>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat;