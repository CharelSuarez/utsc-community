import "./container.css"
import Friend from "../Friends/Friends"

interface FriendProps{
    friend: never[]
}

export default function Container({friend}: FriendProps){
    return(
        <>
            <div className="friends container">
                
            </div>
        </>
    )
}