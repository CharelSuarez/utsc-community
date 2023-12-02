import { useRef } from "react";
import "./Text.css"

interface textProps{
    addMessage: (message: string) => any;
}

export default function Text({addMessage} : textProps){

    const messageRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const message =  messageRef.current?.value == undefined ? "" : messageRef.current?.value;
        
        addMessage(message);   
    }

    return(
        <form className="text" onSubmit={handleSubmit}>
            <input type="text" 
            placeholder="Write a message"
            required
            ref={messageRef}
            />
            <button type="submit">
                <img src="/message.png" alt="" />
            </button>
        </form>

    )
}