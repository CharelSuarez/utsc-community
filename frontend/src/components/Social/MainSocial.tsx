import { useState } from "react"
import FriendContent from "./Content/FriendContent"
import MessageContent from "./Content/MessageContent"
import "./MainSocial.css"
import Topbar from "./Topbar/Topbar"
import AccountContent from "./Content/AccountContent"

interface SocialProps {
    current: string
}

export default function Social({ current }: SocialProps) {
    
    const [active, setActive] = useState("Your Messages");

    return (<>
        {
            (current == "Messages") ?
                <div className="main">
                    <Topbar current={current} update={setActive} active={active} />
                    <MessageContent tab={active} />
                </div> :
            (current == "Friends") ?
                <div className="main">
                    <Topbar current={current} update={setActive} active={active} />
                    <FriendContent />
                </div> :
            (current == "Account") ?
                <div className="main">
                    <AccountContent />
                </div> :
            <div className="main">Nothing to see here</div>
        }
    </>)
}