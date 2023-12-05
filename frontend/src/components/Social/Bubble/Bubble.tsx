import "./Bubble.css"

interface Bubbleprops{
    user: string
    message: string
    mine: boolean
}

export default function Bubble({user, message, mine}: Bubbleprops){
    let bubble = mine ? "bubble mine" : "bubble yours"
    let userBubble = mine ? "user hidden" : "user"



    return (
        <div className="text-holder">
            
            <div key={message} className={bubble}>{message}</div>
            <div className={userBubble}>{user}</div>
        </div>
       
    )
}