import { useState } from "react"
import Tab from "../Tab/Tab"
import "./Topbar.css"

interface Topbar{
    current: string
    active: string
    update: (tab: string) => void
}

export default function Topbar({current, update, active}: Topbar){

    const MessageTabs = ["Your Messages", "Create Group"];
    const FriendTabs = ["Your Friends"];

    let key = 0;

    return (<>
        <div className="topbar">
            <div className="topbar-title">
                {current}
            </div>

            {
                (current=="Messages")? (<div className="tabs">
                    {MessageTabs.map((label) => <Tab key={key++} label={label} image="" type="select" update={update} active={active} />)}
                </div>) : (<div className="tabs">
                    {FriendTabs.map((label) => <Tab key={key++} label={label} image="" type="select" update={update} active={active} />)}
                </div>)
            }

        </div>
        
    </>)
}