import "./Message.css"

import Text from "../Text/Text"
import { Socket, io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
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



let socket: Socket | null = null;

export default function Message({name, _id}: MessageProps){

    const [messages , setMessages] = useState<Message[]>([]); 
    const scrollRef = useRef<HTMLDivElement | null>(null)

    let key = 0
  
    useEffect(() => {
        socket = io('ws://utscampus.live:2083',{
            transports: ['websocket']
        });
        socket.on('message', (text) =>{
            setMessages((oldMessages) => [...oldMessages, text]);
        });

        

        return () => {
            if (!socket) {
                return;
            }
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

    useEffect(() => {
        let scroll = scrollRef.current == null ? null : scrollRef.current
                    
        if(scroll){
            scroll.scrollIntoView({behavior:"smooth"})
        }

    }, [messages.length]);

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
                    <div>

                       { messages.map((message) => <Bubble key={key++} user={message.user} message={message.message} mine={message.mine}/>)}
                       <div ref={scrollRef}></div>
                    </div>
                    
                )}
            </div>
            <div className="text">
                <Text addMessage = {(message: string) => {
                    if (!socket) {
                        return;
                    }
                    socket.emit('message', {_id: _id, message: message, mine: socket.id})            
                }} />
            </div>
        </div>   }

        



       
        </>
    )

}
