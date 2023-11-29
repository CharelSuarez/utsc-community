'use client'

import "./social.css"


import Navigation from "@/components/Social/Navigation/Navigation"

import { useEffect, useState } from "react"
import Message from "@/components/Social/Messages/Message"



export default function Page() {
    const [group , setGroup] = useState<string[]>([]);

    return(
        <>  
            <div className="content">
                <div className="navigation">
                    <Navigation current = {(group: string[]) => setGroup(group)}/>
                </div>


                <div className="messages">
                    <Message group = {group.join(', ')} />
                </div>
            </div>
        </>
    )
}