import { useEffect, useRef } from "react";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";


const Message = ({ messageInfo }) => {

    const { data } = useContext(ChatContext);
    const ref = useRef();

    const GetDate = (seconds) => {

        let date = new Date(seconds * 1000);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        let strYear = year.toString();
        let lastTwoNumbersOfYear = strYear.slice(-2);

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes.toString().padStart(2, '0');
        let strTime = hours + ':' + minutes + ' ' + ampm;

        return `${month}/${day}/${lastTwoNumbersOfYear}, ${strTime}`;
    }

    useEffect(() => { // прокрутка к новому сообщению
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageInfo[1].message])


    return (
        <div ref={ref} className={`message ${messageInfo[1].owner == 0 && 'message_owner'}`} >
            {messageInfo[1].owner == 1 && <img className="message__photo" src={data.contact.photoURL} alt="" />}
            <div className="message__info">
                <p className="message__text">{messageInfo[1].message}</p>
                <p className="message__date">{GetDate(messageInfo[1].time.seconds)}</p>
            </div>
        </div>
    )
}

export default Message;