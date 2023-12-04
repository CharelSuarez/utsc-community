'use client'

import "./social.css"

import { useEffect, useState } from "react"

import Sidebar from "@/components/Social/Sidebar/Sidebar"
import Social from "@/components/Social/MainSocial"
import { useSearchParams } from "next/navigation"
import { getUserId } from "@/api/auth"

export default function Page() {
    let tab = "Messages";
    const searchParams = useSearchParams()
    if (searchParams.has('tab')) {
        tab = searchParams.get('tab') as string
    }
    const [active, setActive] = useState<string>(tab);
    const [user, setUser] = useState<string | null>(null)

    useEffect(() =>{
        setUser(getUserId());
    },[])
    

    return (
        <>
            <div className="content">
                <Sidebar active={active} update={setActive} user={user} />
                <Social current={active} />
            </div>
        </>
    )
}