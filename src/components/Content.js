import React, { useState } from 'react'
import Tasks from './Tasks'
import Sidebar from './Sidebar'

const Content = () => {
    const [selectedTab, setselectedTab] = useState("Inbox")
    return (
        <section className="content">
            <Sidebar selectedTab={selectedTab} setselectedTab={setselectedTab}/>
            <Tasks selectedTab={selectedTab}/>
        </section>
    )
}

export default Content
