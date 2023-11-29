import "./container.css"
import Profile from "../Profile/Profile"
import { useEffect, useState } from "react"
import { addGroup, getChat } from "@/api/social"

interface ContainerProp{
    users: string[]
    addGroup: (username: string) => void
}

export default function Container({users, addGroup}: ContainerProp){


    return(
        <>
            <div className="container">
                {(  
                    users.map((user) => <Profile key={user} name={user} addGroup = {addGroup} />)
                )}
            </div>
        </>
    )
}