import { useState } from "react";
import Contacts from "./Contacts";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = () => {

    const [displayNone, setDisplayNone] = useState(false);

    return (
        <div className="sidebar">
            <Navbar />
            <Search setDisplayNone={setDisplayNone}/>
            <Contacts displayNone={displayNone} />
        </div>
    )
}

export default Sidebar;