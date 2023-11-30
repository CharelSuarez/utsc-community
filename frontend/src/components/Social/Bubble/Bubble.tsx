interface Bubbleprops{
    user: string
    message: string
}

export default function Bubble({user, message}: Bubbleprops){
    return (
        <div key={message}>{user} said {message}</div>
    )
}