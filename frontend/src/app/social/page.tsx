'use client'

import Form from "@/components/Social/Form/Form"
import { useEffect, useState } from "react"

export default function Page() {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        
    }, [])

    return(
        <>
            <div className="title">User</div>
            <Form></Form>
        </>
    )
}