import "./navigation.css"

import Form from "../Form/Form"
import Button from "../Button/Button"

import { useState } from "react";
import { addFriend } from "@/api/social";



export default function Navigation(){
    const [users, setUsers] = useState([]);

    
    return(
        <>
            <div className="navi">
                <div className="search">
                    <Form addFriend = {(username: string) => addFriend(username).then(setUsers)}/>
                </div>
                <div className="selection">
                    <Button label="Direct" />
                    <Button label="Group"/>
                </div>
                <div className="display">
                </div>
            </div>
        </>
    )
}