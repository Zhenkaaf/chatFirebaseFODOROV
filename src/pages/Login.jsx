import { auth, provider } from '../firebase';
import gooImg from './../img/gooBtn.png';
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('USSEEEEEEEEERRRR**OK===', user);
        navigate('/');
      })

      .catch((error) => {
        const errorCode = error.code;
        console.log('ERRRRRORRRRR===', errorCode);
      });
  }


  return (
    <div className="login">
      <div className="body">
        <h2 className="login__title">Chat</h2>
        <h3 className="login__title">Test task</h3>
        <p>Please log in with:</p>
        <button className="login__btn" onClick={signInGoogle}><img className="login__icon" src={gooImg} alt="" />Sign in with Google</button>
      </div>
    </div>
  )
}
export default Login;