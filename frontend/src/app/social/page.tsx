'use client'

import "./social.css"

import Form from "@/components/Social/Form/Form"
import Friend from "@/components/Social/Friends/Friends"
import Container from "@/components/Social/Container/Container"

import { useEffect, useState } from "react"
import { getFriend } from "@/api/social"



export default function Page() {
    const [users, setUsers] = useState([]);

    return(
        <>  

            <div className="title">User</div>

            <div className="content">
                <Form getFriend = {(username: string) => getFriend(username).then(setUsers)} />
                
                <Container />
            </div>

        </>
    )
}