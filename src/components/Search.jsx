import { useContext, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';



const Search = ({ setDisplayNone }) => {

    const { dispatch } = useContext(ChatContext);
    const [searchName, setSearchName] = useState('');
    const [searchedContacts, setSearchedContacts] = useState(null);



    useEffect(() => {
        const handleSearch = async () => {
            const q = query(collection(db, "users"));
            let users = [];
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {

                if (doc.data().displayName.toLowerCase().includes(searchName.toLowerCase())) {
                    users.push(doc.data());
                };
            });
            setSearchedContacts(users);
        }

        searchName.length > 0 && handleSearch();
        setSearchedContacts(null);

    }, [searchName])

    const handleSelect = (contact) => {
        dispatch({ type: "CHANGE_CONTACT", payload: contact });
        setSearchName('');
    }

    return (
        <div className="search">
            <div className="searchForm">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="searchForm__icon" />
                <input type="text" placeholder="Search or start new chat"
                    onChange={e => setSearchName(e.target.value)}
                    onFocus={(e) => { setDisplayNone(true) }}
                    onBlur={(e) => { setDisplayNone(false); setSearchName(''); }}
                    value={searchName} />
            </div>

            {searchedContacts && searchedContacts.map((contact) => (
                <div className="contact" key={contact.uid} onClick={() => handleSelect(contact)}>
                    <div className="contact__img">
                        <img src={contact.photoURL} alt="" />
                    </div>
                    <div className="contact__info">
                        <p className="contact__name">{contact.displayName}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default Search;



/*  <div className="userChat">
     <img src="https://images.pexels.com/photos/5540995/pexels-photo-5540995.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
     <div className="userChatInfo">
         <span>Jane</span>
     </div>
 </div> */