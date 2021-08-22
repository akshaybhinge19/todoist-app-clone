import React from 'react'
import {FaInbox, FaRegCalendarAlt, FaRegCalendar} from "react-icons/fa"

const Sidebar = ({selectedTab, setselectedTab}) => {
    // console.log(selectedTab);
    return (
        <div className="sidebar">
            <div onClick={()=> setselectedTab("Inbox")}><FaInbox className="icon"/>Inbox</div>
            <div onClick={()=> setselectedTab("Today")}><FaRegCalendarAlt className="icon"/>Today</div>
            <div onClick={()=> setselectedTab("Next_7")}><FaRegCalendar className="icon"/>Next 7 Days</div>
        </div>
    )
}

export default Sidebar
