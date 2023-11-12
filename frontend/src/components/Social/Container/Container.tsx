import "./container.css"
import Profile from "../Profile/Profile"
import { useEffect, useState } from "react"
import { getChat } from "@/api/social"


export default function Container(){
    const [chat, setChat] = useState([])

    useEffect(()=>{
        getChat("bob").then((chat)=>{
            setChat(chat.chat)
        });

    }, []);

    return(
        <>
            <div className="container">
                {(  
                    chat.map((user) => <Profile key={user} name={user}/>)
                )}
            </div>
        </>
    )
}