'use client'

import "./social.css"

import Form from "@/components/Social/Form/Form"
import Container from "@/components/Social/Container/Container"
import Navigation from "@/components/Social/Navigation/Navigation"

import { useEffect, useState } from "react"
import { addFriend } from "@/api/social"
import Message from "@/components/Messages/Message"



export default function Page() {
    const [users, setUsers] = useState([]);

    return(
        <>  
            <div className="content">
                <div className="navigation">
                    <Navigation />
                </div>


                <div className="messages">
                    <Message />
                </div>
            </div>
        </>
    )
}