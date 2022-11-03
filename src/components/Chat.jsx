import Messages from "./Messages";
import Input from "./Input";



const Chat = () => {



    
    return (
        <div className="chat">
            <div className="chatInfo">
                <img src="https://images.pexels.com/photos/5540995/pexels-photo-5540995.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                <span>Jane</span>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat;