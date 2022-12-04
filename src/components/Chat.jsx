import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Notifications } from 'react-push-notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';


const Chat = () => {

    const { data } = useContext(ChatContext);


    return (
        <div className="chat">
            <div className="chatNotification">
                <Notifications className="test" position="top-right" />
            </div>
            {data.contact.photoURL
                ? <div className="chatInfo">
                    <div className="chatInfo__img">
                        <img src={data.contact.photoURL} alt="" />
                        <FontAwesomeIcon className="chatInfo__icon" icon={faCircleCheck} />
                    </div>

                    <p className="chatInfo__name">{data.contact?.displayName}</p>
                </div>

                : <div className="chatInfo">

                </div>}




            <Messages />
            <Input />
        </div>
    )
}

export default Chat;