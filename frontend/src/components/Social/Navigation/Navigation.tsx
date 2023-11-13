import "./navigation.css"

import Form from "../Form/Form"
import Button from "../Button/Button"

import { useEffect, useState } from "react";
import { addFriend, getChat } from "@/api/social";
import Container from "../Container/Container";



export default function Navigation(){
    const [friend, setUsers] = useState<string[]>([]);

    useEffect(()=>{
        getChat().then((doc)=>{
            setUsers(doc.chat)
        });
    }, []);

    
    return(
        <>
            <div className="navi">
                <div className="search">
                    <Form addFriend = {(username: string) => addFriend(username).then((friends) => setUsers(friends.user))}/>
                </div>
                <div className="selection">
                    <Button label="Direct" />
                    <Button label="Group"/>
                </div>
                    <Container users = {friend} />
                </div>
        </>
    )
}