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
    const [group, setGroup] = useState<string[]>([]);
    const [groupId, setId] = useState<string>("");

  
    useEffect(() => {
        getAllGroup().then((doc) => {

        })
    }, []);

    return (<>

        {(tab == "Your Messages") ? (
            <div className="main-content">
                <Navigation current={(group: string[]) => setGroup(group)} update={(id: string) => setId(id)} />
                <Message group={group} _id={groupId} />
            </div>

        ) : (
            <div className="main-content">
                <Group />
            </div>)}

    </>)
}