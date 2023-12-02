import { useState } from "react";
import Navigation from "../Navigation/Navigation"
import "./Content.css"
import Message from "../Messages/Message";

export default function MessageContent(){
    const [group , setGroup] = useState<string[]>([]);
    const [groupId , setId] = useState<string>("");

    return(<>
        <div className="main-content">
            <Navigation current = {(group: string[]) => setGroup(group)} update = {(id: string) => setId(id)}/>
            <Message group = {group} _id={groupId} />
        </div>
    </>)
}