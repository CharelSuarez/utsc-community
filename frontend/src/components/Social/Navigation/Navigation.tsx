import "./navigation.css"
import { useEffect, useState } from "react";
import { addFriend, addGroup, getAllGroup } from "@/api/social";
import GroupTabs from "../Profile/GroupTabs";

interface NaviProps {
    current: (users: string) => void
    update: (id: string) => void
}

interface GroupProps {
    users: string[]
    _id: string
    name: string
}


export default function Navigation({ current, update }: NaviProps) {
    const [friend, setUsers] = useState<string[]>([]);
    const [group, setGroup] = useState<string[]>([]);
    const [list, setList] = useState<GroupProps[]>([]);

    useEffect(() => {
        getAllGroup().then(function (doc) {
            setList(doc.group)
            if (doc.group.length != 0) {
                current(doc.group[0].name);
                update(doc.group[0]._id);
            }
        });
    }, []);

    return (
        <>
            {list.length == 0 ?
                <div></div> :
                <div className="navigation-main">
                    {list.map((group) => <GroupTabs name={group.name} key={group._id} addCurrent={current} update={update} id={group._id} />)}
                </div>
            }
            {/* 
            <div className="navigation-main">

                {list.length == 0 ? <div></div> :  
                list.map((group) => <GroupTabs name={group.name} key={group._id} addCurrent = {current} update={update} id={group._id}/>)}
            </div> */}
        </>
    )
}