import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const Navbar = () => {

    const { currentUser } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="user">
                <div className="user__img">
                    <img src={currentUser.photoURL ? currentUser.photoURL : 'https://www.norbel.ru/assets/images/no_ava.png'} alt="" />
                    <FontAwesomeIcon className="user__icon" icon={faCircleCheck} />
                </div>
                <p className="user__name">{currentUser.displayName}</p>
            </div>
            <button className="navbar__exit" onClick={() => { signOut(auth) }}>Logout</button>
        </div>
    )
}

export default Navbar;