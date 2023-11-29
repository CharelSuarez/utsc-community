import "./navigation.css"

import Form from "../Form/Form"

import { useEffect, useState } from "react";
import { addFriend, getChat, addGroup, getAllGroup} from "@/api/social";
import Container from "../Container/Container";
import Group from "../Form/Group/Group";

interface NaviProps{
    current: (users: string[]) => void
}


export default function Navigation({current}: NaviProps ){
    const [friend, setUsers] = useState<string[]>([]);
    const [group, setGroup] = useState<string[]>([]);
    const [list, setList] = useState<string[]>([])

    useEffect(()=>{
        getChat().then((doc)=>{
            setUsers(doc.chat)
        });
    }, []);

    useEffect(() => {
        getAllGroup().then((doc) => setList(doc.group));
    
    },[]);
    
    return(
        <>
            <div className="navi">
                <div className="search">
                    <Form addFriend = {(username: string) => addFriend(username).then((friends) => setUsers(friends.user))}/>
                </div>
                <div className="group-add">
                    {group}
                    <button onClick={() => addGroup(group).then((group) => {current(group); setList([...list,group])})}>Add Groups</button>
                </div>
                    <Container users = {friend} addGroup = {(user: string) => setGroup([...group, user])}/>
                    <Group groups={list} addCurrent ={current}/>
                </div>
        </>
    )
}