import "./Friends.css"

interface FriendProps{
    name: string
}

export default function Friend({name}: FriendProps){
    return (
        <>
            <div className="container">
                <div className="profile"></div>
                <div className="name">{name}</div>
            </div>  
        </>
    )
}