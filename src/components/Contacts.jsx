
import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { WindowContext } from "../context/ActiveWindows";



const Contacts = ({ displayNone }) => {

    const [contacts, setContacts] = useState([]);
    const { dispatch } = useContext(ChatContext);
    const { dispatchWindows } = useContext(WindowContext);


    const GetDate = (seconds) => {
        const renameMonth = {
            1: 'Jan',
            2: 'Feb',
            3: 'Mar',
            4: 'Apr',
            5: 'May',
            6: 'Jun',
            7: 'Jul',
            8: 'Aug',
            9: 'Sep',
            10: 'Oct',
            11: 'Nov',
            12: 'Dec'
        }

        let date = new Date(seconds * 1000);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        return `${renameMonth[month]} ${day}, ${year}`;
    }


    useEffect(() => { //получим объект с данными обновляющимися после каждого внесения изменения в firebase
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setContacts(users);
        });

        return () => {
            unsubscribe();
        }
    }, [])


    const handleSelect = (contact) => {
        dispatch({ type: "CHANGE_CONTACT", payload: contact });

        const windowInnerWidth = window.innerWidth;
        if (windowInnerWidth <= 1024) {
            dispatchWindows({ type: "HIDE_CONTACTS" });
        }
    }


    return (
        <div className={(displayNone ? 'displayNone' : '') + ' contacts'} >
            <h2 className="contacts__header">Chats</h2>
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
                <div className="contact" onClick={() => handleSelect(contact)} key={contact.uid}>

                    <div className="contact__img">
                        <img src={contact.photoURL} alt="" />
                        <FontAwesomeIcon className="contact__icon" icon={faCircleCheck} />
                    </div>

                    <div className="contact__info">
                        <p className="contact__name">{contact.displayName}</p>
                        {contact.messages.length ? <p className="contact__message">{contact.messages.slice(-1)[0].message}</p> : null}
                    </div>
                    {contact.messages.length ? <p className="contact__date">{GetDate(contact.messages.slice(-1)[0].time.seconds)}</p> : null}

                </div>
            ))
            }
        </div>
    )
}

export default Contacts;


