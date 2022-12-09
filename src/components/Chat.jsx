import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Notifications } from 'react-push-notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { WindowContext } from "../context/ActiveWindows";

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



const Chat = () => {

    const { dispatchWindows } = useContext(WindowContext);
    const { data, dispatch } = useContext(ChatContext);


    return (
        <div className="chat">
            <div className="chatNotification">
                <Notifications className="test" position="top-right" />
            </div>
            {data.contact.photoURL
                ? <div className="chatInfo">
                    <FontAwesomeIcon className="chatInfo__btn" icon={faArrowLeft} onClick={ () => {dispatchWindows({ type: "SHOW_CONTACTS"}); dispatch({ type: "DEL_CONTACT"});} }/>
                    <div className="chatInfo__img">
                        <img src={data.contact.photoURL} alt="" />
                        <FontAwesomeIcon className="chatInfo__icon" icon={faCircleCheck} />
                    </div>

                    <p className="chatInfo__name">{data.contact?.displayName}</p>
                </div>

                : <div className="chatInfo">
                    <button className="chatInfo__btn">backToContcts</button>
                </div>}




            <Messages />
            <Input />
        </div>
    )
}

export default Chat;