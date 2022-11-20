import { useContext, useEffect,  useState } from 'react';
import Message from './Message';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext';


const Messages = () => {
    const [messages, setMessages] = useState(null);
    const { data } = useContext(ChatContext);

    useEffect(() => {

        if (!data.contact.uid) {
            return;
        }
        const unsubscribe = onSnapshot(doc(db, "users", data.contact.uid), (doc) => {
            setMessages(Object.entries(doc.data().messages));
        });

        return () => {
            unsubscribe();
        }

    }, [data.contact.uid]);



    return (
        <div className="messages">
            {messages && messages.map((m, index) => (
                <Message key={index} messageInfo={m} />
            ))}
            {/* <Message />
            <Message />
            <Message /> */}
        </div>
    )
}

export default Messages;