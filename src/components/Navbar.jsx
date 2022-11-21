import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";


const Navbar = () => {

   const {currentUser} = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="user">
                <img src={currentUser.photoURL ? currentUser.photoURL : 'https://www.norbel.ru/assets/images/no_ava.png'} alt="" />
                <span className="name">{currentUser.displayName}</span>
                <button onClick={()=>{signOut(auth)}}>logout</button>
            </div>
        </div>
    )
}

export default Navbar;