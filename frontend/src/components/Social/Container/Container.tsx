import "./container.css"
import Friend from "../Friends/Friends"

interface FriendProps{
    friends: never[]
}

export default function Container({friends}: FriendProps){
    console.log(friends)
    return(
        <>
            <div className="friends container">
                {friends.map((friend) => (
                    <Friend name={friend}/>
                ))}
            </div>
        </>
    )
}