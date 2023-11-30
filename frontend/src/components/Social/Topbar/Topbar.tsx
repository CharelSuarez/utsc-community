import { useState } from "react"
import Tab from "../Tab/Tab"
import "./Topbar.css"

interface Topbar{
    current: string
}

export default function Topbar({current}: Topbar){
    const [active, setActive] = useState("Your Messages");

    const MessageTabs = ["Your Messages", "Create Group"];
    const FriendTabs = ["Your Friends", "Add Friends"];

    let key = 0;

    return (<>
        <div className="topbar">
            <div className="title">
                {current}
            </div>

            {
                (current=="Messages")? (<div className="tabs">
                    {MessageTabs.map((label) => <Tab key={key++} label={label} image="" type="select" update={setActive} active={active} />)}
                </div>) : (<div className="tabs">
                    {FriendTabs.map((label) => <Tab key={key++} label={label} image="" type="select" update={setActive} active={active} />)}
                </div>)
            }

        </div>
        
    </>)
}