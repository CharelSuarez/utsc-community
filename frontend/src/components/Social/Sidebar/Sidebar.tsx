import { useState, useEffect } from "react";
import Tab from "../Tab/Tab";
import "./Sidebar.css"
import Link from "next/link";
import { getUsername, logout } from "@/api/auth";

interface Sidebar {
    update: (active: string) => void
    active: string
}

export default function Sidebar({update, active}: Sidebar){
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        const username = getUsername();
        if (username !== null) {
            setUsername(username)
        }
    }, [])

    return (<>
        <div className="sidebar">
            <div className="main-title">UTSC</div>
            <div className="welcome-text">Welcome, {username}!</div>
            <div className="tabs">
                <div className="social-holder">
                    <div className="title">Social</div>
                    <div className="tab-holder">
                        <Tab label="Messages" image="/icons/message.png" active={active} update={update} type="tab"/>
                        <Tab label="Friends" image="/icons/friends.png" active={active} update={update} type="tab"/>
                    </div>
                </div>
                <div className="navi">
                    <div className="title">Navigation</div>
                    <div className="tab-holder">
                        <Link href="/">
                            <Tab label="Dashboard" image="/icons/dashboard.png" active={active} update={update} type="tab"/>
                        </Link>
                        <Tab label="Events" image="/icons/event.png" active={active} update={update} type="tab"/>
                        <Link href="/dashboard">
                            <Tab label="Map" image="/icons/map.png" active={active} update={update} type="tab"/>
                        </Link>

        
                    </div>
                </div>
            </div>
            <div className="sign">
                <Tab label="Account" image="/icons/user.png" active={active} update={update} type="tab"/>
                <Tab label="Sign Out" image="/icons/exit.png" active={active} update={() => {
                    logout().then(() => {
                        window.location.href = "/"
                    });
                }} type="tab red"/>
            </div>
        </div>

    
    </>)
}