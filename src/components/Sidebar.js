import React from 'react'
import {FaInbox, FaRegCalendarAlt, FaRegCalendar} from "react-icons/fa"

const Sidebar = ({selectedTab, setselectedTab}) => {
    // console.log(selectedTab);
    return (
        <div className="sidebar">
            <div className={selectedTab==='Inbox' ? `active`:"" } onClick={()=> setselectedTab("Inbox")}><FaInbox className="icon"/>Inbox</div>
            <div className={selectedTab==='Today' ? `active`:"" } onClick={()=> setselectedTab("Today")}><FaRegCalendarAlt className="icon"/>Today</div>
            <div className={selectedTab==='Next_7' ? `active`:"" } onClick={()=> setselectedTab("Next_7")}><FaRegCalendar className="icon"/>Next 7 Days</div>
        </div>
    )
}

export default Sidebar
