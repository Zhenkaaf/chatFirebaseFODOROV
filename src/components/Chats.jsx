
import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";


const Chats = () => {

    const [contacts, setContacts] = useState([]);
    const { dispatch } = useContext(ChatContext);


    useEffect(() => { //получим объект с данными обновляющимися после каждого внесения изменения в firebase
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setContacts(users);
        });
    }, [])


    const handleSelect = (contact) => {
        dispatch({ type: "CHANGE_CONTACT", payload: contact });
    }

    return (
        <div className="chats">
            {contacts.sort((a, b) => {
                if (a.messages.length == 0) {
                    return 1;
                }
                else if (b.messages.length == 0) {
                    return -1;
                }
                else {
                    return b.messages.slice(-1)[0].time - a.messages.slice(-1)[0].time;
                }
            }).map((contact) => (
                <div className="userChat" onClick={() => handleSelect(contact)} key={contact.uid}>
                    <img src={contact.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{contact.displayName}</span>
                        {contact.messages.length ? <p>{contact.messages.slice(-1)[0].message}</p> : null}
                        {contact.messages.length ? <p>{contact.messages.slice(-1)[0].time.seconds}</p> : null}
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default Chats;


