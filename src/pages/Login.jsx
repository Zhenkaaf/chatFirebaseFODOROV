import gooImg from './../img/gooBtn.png';


const Login = () => {
    /*  const dispatch = useDispatch();
     const signInGoogle = () => {
       const provider = new GoogleAuthProvider();
       signInWithPopup(auth, provider)
         .then((result) => {
           console.log(result);
           dispatch(setUserAC(true, result.user.displayName, result.user.email, result.user.photoURL));
           
   
         }).catch((error) => {
           console.log(error);
         });
     } */

    return (
        <div>
            <div className="loginContainer">
                <div className="loginWrapper">
                    <div className="loginTitle">Chat. Test task</div>
                    <div>Please log in with:</div>
                    <button className="loginBtn" /* onClick={signInGoogle} */><img src={gooImg} alt="" />Sign in with Google</button>
                </div>
            </div>
        </div>
    )
}
export default Login;