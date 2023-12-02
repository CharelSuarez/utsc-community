'use client'

import "./social.css"

import { useEffect, useState } from "react"

import Sidebar from "@/components/Social/Sidebar/Sidebar"
import Social from "@/components/Social/MainSocial"



export default function Page() {
    const [active, setActive] = useState<string>("Messages");

    return(
        <>  
            <div className="content">
                <Sidebar active={active} update={setActive}/>
                <Social current={active} />
                
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