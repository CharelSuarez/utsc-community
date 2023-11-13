'use client'

import "./social.css"


import Navigation from "@/components/Social/Navigation/Navigation"

import { useEffect, useState } from "react"
import Message from "@/components/Social/Messages/Message"



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