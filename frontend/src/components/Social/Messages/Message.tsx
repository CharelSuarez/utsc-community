import "./Message.css"

import Text from "../Text/Text"
import { io } from "socket.io-client";
import { useState } from "react";

export default function Message(){

    const [messages , setMessages] = useState(""); 

    const socket = io('ws://localhost:5001',{
        transports: ['websocket']
    });

    socket.on('message', (text) =>{
        setMessages(text);
    });

    return(
        <>
        <div className="message-display">
        <div className="display">{messages}</div>
            <div className="text">
                <Text addMessage = {(message: string) => socket.emit('message', message)} />
            </div>
        </div>   
        </>
    )

}
