import { auth, db, provider } from '../firebase';
import gooImg from './../img/gooBtn.png';
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import {useNavigate} from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('USSEEEEEEEEERRRR**OK===', user);
        navigate('/');
       /*  return user; */
      })
      /* .then(async(user) => {
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        });
       

        //await setDoc(doc(db, "userChats", user.uid), { 

        //});
      }) */
      .catch((error) => {
        const errorCode = error.code;
        console.log('ERRRRRORRRRR===', errorCode);
      });
  }


  return (
    <div>
      <div className="loginContainer">
        <div className="loginWrapper">
          <div className="loginTitle">Chat. Test task</div>
          <div>Please log in with:</div>
          <button className="loginBtn" onClick={signInGoogle}><img src={gooImg} alt="" />Sign in with Google</button>
        </div>
      </div>
    </div>
  )
}
export default Login;