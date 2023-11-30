'use client'

import "./social.css"


import Navigation from "@/components/Social/Navigation/Navigation"

import { useEffect, useState } from "react"
import Message from "@/components/Social/Messages/Message"
import Tab from "@/components/Social/Tab/Tab"
import Sidebar from "@/components/Social/Sidebar/Sidebar"
import Social from "@/components/Social/MainSocial"



export default function Page() {
    const [group , setGroup] = useState<string[]>([]);
    const [groupId , setId] = useState<string>("");
    const [active, setActive] = useState<string>("Messages");

    return(
        <>  
            <div className="content">
                <Sidebar />
                <Social />
                {/* <div className="navigation">
                    <Navigation current = {(group: string[]) => setGroup(group)} update = {(id: string) => setId(id)}/>
                </div> */}


                {/* <div className="messages">
                    <Message group = {group} _id={groupId} />
                </div> */}
            </div>
        </>
    )
}