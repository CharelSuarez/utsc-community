import "./container.css"
import Profile from "../Profile/Profile"
import { useEffect, useState } from "react"
import { getChat } from "@/api/social"

interface FriendProp{
    users: string[]
}

export default function Container({users}: FriendProp){


    return(
        <>
            <div className="container">
                {(  
                    users.map((user) => <Profile key={user} name={user}/>)
                )}
            </div>
        </>
    )
}