import { useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";




const Message = ({messageInfo, temp}) => {
/* console.log(temp); */

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    /* console.log(data.contact.uid); */
    const ref = useRef();
    useEffect(() => { // прокрутка к новому сообщению
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [messageInfo[1].message])
   

    
    return (
        <div ref={ref} className="message owner" >
            <div className="messageInfo">
                <img src={messageInfo[1].owner == 1 ? data.contact.photoURL : currentUser.photoURL} alt="" />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>{/* temp == data.contact.uid &&  */messageInfo[1].message}</p>
            </div>
        </div>
    )
}

export default Message;