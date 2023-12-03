'use client'

import "./social.css"

import { useState } from "react"

import Sidebar from "@/components/Social/Sidebar/Sidebar"
import Social from "@/components/Social/MainSocial"



export default function Page() {
    const [active, setActive] = useState<string>("Messages");

    return (
        <>
            <div className="content">
                <Sidebar active={active} update={setActive} />
                <Social current={active} />
            </div>
        </>
    )
}