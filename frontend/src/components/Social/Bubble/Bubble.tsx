import "./Bubble.css"

interface Bubbleprops{
    user: string
    message: string
    mine: boolean
}

export default function Bubble({user, message, mine}: Bubbleprops){
    let style = mine ? "bubble mine" : "bubble yours"
    return (
        <div key={message} className={style}>{message}</div>
    )
}