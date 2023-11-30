import "./navigation.css"

import Form from "../Form/Form"

import { useEffect, useState } from "react";
import { addFriend, getChat, addGroup, getAllGroup} from "@/api/social";
import Container from "../Container/Container";
import Group from "../Form/Group/Group";

interface NaviProps{
    current: (users: string[]) => void
    update: (id: string) => void
}

interface GroupProps{
    users: string[]
    _id: string
}


export default function Navigation({current, update}: NaviProps ){
    const [friend, setUsers] = useState<string[]>([]);
    const [group, setGroup] = useState<string[]>([]);
    const [list, setList] = useState<GroupProps[]>([]);

    useEffect(()=>{
        getChat().then((doc)=>{
            setUsers(doc.chat)
        });
    }, []);

    useEffect(() => {
        getAllGroup().then(function(doc){
            setList(doc.group)
            console.log(doc.group[0]._id);
            
            if(doc.group.length != 0){
                current(doc.group[0].users);
                update(doc.group[0]._id);
            }
        });
    },[]);
    
    return(
        <>
            <div className="navi">
                <div className="search">
                    <Form addFriend = {(username: string) => addFriend(username).then((friends) => setUsers(friends.user))}/>
                </div>
                <div className="group-add">
                    {group}
                    <button onClick={() => addGroup(group).then((doc) => {current(doc.users); setList([...list, doc]); update(doc._id)})}>Add Groups</button>
                </div>
                    <Container users = {friend} addGroup = {(user: string) => setGroup([...group, user])}/>
                    <Group groups={list.map((item) => item.users.join(','))} addCurrent ={current} />
                </div>
        </>
    )
}