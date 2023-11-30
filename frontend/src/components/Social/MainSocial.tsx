
import FriendContent from "./Content/FriendContent"
import MessageContent from "./Content/MessageContent"
import "./MainSocial.css"
import Topbar from "./Topbar/Topbar"

interface SocialProps{
    current: string
}

export default function Social({current}:SocialProps){
    return(<>
       <div className="main">
            <Topbar current={current}/>
            {
                (current=="Messages") ? <MessageContent />: <FriendContent />
            }
       </div>
    </>)
}