import { useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";




const Message = ({ messageInfo }) => {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const ref = useRef();
    const refOwner = useRef();

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
        refOwner.current?.scrollIntoView({ behavior: "smooth" })
    }, [messageInfo[1].message])

    {/* <div className={`message ${messageInfo[1].owner == 1 && "owner"}`}></div> */ }
    return (
        <div>
            {messageInfo[1].owner == 1 ?

                <div ref={ref} className="message" >
                    <img className="message__photo" src={data.contact.photoURL} alt="" />
                    <div className="message__info">
                        <p className="message__text">{messageInfo[1].message}</p>
                        <p className="message__date">{GetDate(messageInfo[1].time.seconds)}</p>
                    </div>
                </div>

                : <div ref={refOwner} className="message message_owner" >
                    <div className="message__info message__info_owner">
                        <p className="message__text message__text_owner">{messageInfo[1].message}</p>
                        <p className="message__date message__date_owner">{GetDate(messageInfo[1].time.seconds)}</p>
                    </div>
                </div>
                
                
                
                

            }
        </div>


    )
}

export default Message;


/* {<div ref={ref} className="message-owner" >
                    <div className="message-owner__info">
                        <div className="message-owner__text">
                            <p>{messageInfo[1].message}</p>
                        </div>
                        <div className="message-owner__date">
                            <p>{GetDate(messageInfo[1].time.seconds)}</p>
                        </div>

                    </div>



                </div>} */