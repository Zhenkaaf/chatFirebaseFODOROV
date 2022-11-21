
import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";


const Contacts = () => {

    const [contacts, setContacts] = useState([]);
    const { dispatch } = useContext(ChatContext);
   

   /*  if (contacts.length !=0) {
        console.log(contacts[0].messages.slice(-1)[0].time.seconds);
        let ttt = contacts[0].messages.slice(-1)[0].time.seconds;
        let date = new Date( ttt * 1000 );

        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        let strYear = year.toString();
        let lastTwoNumbersOfYear = strYear.slice(-2);
        console.log(`${renameMonth[month]} ${day}, ${year}`);
    } */
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
        
        let date = new Date( seconds * 1000 );
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
                        {contact.messages.length ? <p>{GetDate(contact.messages.slice(-1)[0].time.seconds)}</p> : null}
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default Contacts;


