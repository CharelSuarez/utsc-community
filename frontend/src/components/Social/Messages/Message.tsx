import "./Message.css"

import Text from "../Text/Text"
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { getMessages } from "@/api/social";
import Bubble from "../Bubble/Bubble";

interface MessageProps{
    name: string | null
    _id: string
}

interface Message{
    user: string
    message: string
    mine: boolean
}

export default function Message({name, _id}: MessageProps){

    const [messages , setMessages] = useState<Message[]>([]); 
    let key = 0
  
    useEffect(() => {
        const socket = io('ws://localhost:5001',{
            transports: ['websocket']
        });
        socket.on('message', (text) =>{
            setMessages((oldMessages) => [...oldMessages, text]);
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        if(!_id) return;
        getMessages(_id).then(function(doc){
            if(!doc) return;
            setMessages(doc)
        });
    },[_id]);

    return(
        <>
        {(name==null)? <div></div> : (name == "") ? <div className="empty">
            <div className="container">
                <div className="caption">Dont be shy Make some <span className="highlight">Groups!</span></div>
                <img src="/empty/monkey.png" alt="" />
            </div>
           
        </div>: <div className="message-display">
            <div className="group-title">Group: {name}</div>
            <div className="display">
                {(
                    messages.map((message) => <Bubble key={key++} user={message.user} message={message.message} mine={message.mine}/>)
                )}
            </div>
            <div className="text">
                <Text addMessage = {(message: string) => socket.emit('message', {_id: _id, message: message, mine: socket.id})} />
            </div>
        </div>   }

        



       
        </>
    )

}
