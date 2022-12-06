import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { useContext, useState, useEffect } from "react";
import { WindowContext } from "../context/ActiveWindows";
import { ChatContext } from "../context/ChatContext";


const Home = () => {
    const { windows, dispatchWindows } = useContext(WindowContext);
    const [windowWidth, setWindowWidth] = useState(window.screen.width);
    const { data } = useContext(ChatContext);
    console.log(!Object.keys(data.contact).length);

useEffect(() => {
    window.onresize = () => {setWindowWidth(window.screen.width)};
    if (windowWidth > 1024) {
        dispatchWindows({type: "SHOW_ALL"});
    }
    if (windowWidth <= 1024 && !Object.keys(data.contact).length) {
        dispatchWindows({type: "HIDE_CHAT"});
    }
    if (windowWidth <= 1024 && !Object.keys(data.contact).length == false) {
        dispatchWindows({type: "HIDE_CONTACTS"});
    }
    return () => {window.onresize = false};
}, [windowWidth]);
    
    return (
        <div className="home">
            <div className="container">
                {windows.sidebar ? <Sidebar/> : null}
                {windows.chat ? <Chat/> : null}
            </div>
        </div>
    )
}

export default Home;