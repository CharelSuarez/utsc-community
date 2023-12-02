import { useState } from "react";
import Tab from "../Tab/Tab";
import "./Sidebar.css"
import Link from "next/link";

interface Sidebar {
    update: (active: string) => void
    active: string
}

export default function Sidebar({update, active}: Sidebar){
    

    return (<>
        <div className="sidebar">
            <div className="title">UTSC</div>
            <div className="tabs">
                <div className="social-holder">
                    <div className="title">Social</div>
                    <div className="tab-holder">
                        <Tab label="Messages" image="/message.png" active={active} update={update} type="tab"/>
                        <Tab label="Friends" image="/friends.png" active={active} update={update} type="tab"/>
                    </div>
                </div>
                <div className="navi">
                    <div className="title">Navigation</div>
                    <div className="tab-holder">
                        <Link href="/">
                            <Tab label="Dashboard" image="/dashboard.png" active={active} update={update} type="tab"/>
                        </Link>
                        <Tab label="Events" image="/event.png" active={active} update={update} type="tab"/>
                        <Link href="/dashboard">
                            <Tab label="Map" image="/map.png" active={active} update={update} type="tab"/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="sign">
                <Tab label="Sign Out" image="/exit.png" active={active} update={update} type="tab"/>
            </div>
        </div>

    
    </>)
}