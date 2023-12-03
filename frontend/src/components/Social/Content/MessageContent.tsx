import { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation"
import "./Content.css"
import Message from "../Messages/Message";
import { getAllGroup } from "@/api/social";
import Group from "../Group/Group";

interface MessageProps {
    tab: string
}

export default function MessageContent({ tab }: MessageProps) {
    const [group, setGroup] = useState<string>("");
    const [groupId, setId] = useState<string>("");

  
    useEffect(() => {
        getAllGroup().then((doc) => {
            if(doc.group.length == 0) return;

            setGroup(doc.group[0].name);
            console.log(doc.group[0].name)
        })
    }, [tab]);

    return (<>

        {(tab == "Your Messages") ? (
            <div className="main-content">
                <Navigation current={(group: string) => setGroup(group)} update={(id: string) => setId(id)} />
                <Message name={group} _id={groupId} />
            </div>

        ) : (
            <div className="main-content">
                <Group />
            </div>)}

    </>)
}