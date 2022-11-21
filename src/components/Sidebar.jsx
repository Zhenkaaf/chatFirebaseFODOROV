import Contacts from "./Contacts";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = () => {

    return (
        <div className="sidebar">
            <Navbar />
            <Search />
            <Contacts />
        </div>
    )
}

export default Sidebar;