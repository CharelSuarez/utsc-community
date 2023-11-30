import "./Message.css"

import Text from "../Text/Text"
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { getMessages } from "@/api/social";
import Bubble from "../Bubble/Bubble";

interface MessageProps{
    group: string[]
    _id: string
}

interface Message{
    user: string
    message: string
    mine: boolean
}

export default function Message({group, _id}: MessageProps){

    const [messages , setMessages] = useState<Message[]>([]); 
    let key = 0
  

    useEffect(() => {
        getMessages(_id).then(function(doc){
            if(!doc) return;
            setMessages(doc)
        });
    },[_id]);

    const socket = io('ws://localhost:5001',{
        transports: ['websocket']
    });

    socket.on('message', (text) =>{
        setMessages([...messages, text]);
    });

    return(
        <>
        <div className="message-display">
            <div className="title">Group: {group.join(',')}</div>
            <div className="display">
                {(
                    messages.map((message) => <Bubble key={key++} user={message.user} message={message.message} mine={message.mine}/>)
                )}
            </div>
            <div className="text">
                <Text addMessage = {(message: string) => socket.emit('message', {_id: _id, message: message, mine: socket.id})} />
            </div>
        </div>   
        </>
    )

}
