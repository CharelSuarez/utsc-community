import { send } from "./utils";

export function addFriend(username: string){
    return send("POST", '/api/'+username+"/friends/", null);
}

export function getChat(){
    return send("GET", "/api/chat/", null);
}

export function addGroup(users: string[]){
    return send("POST", "/api/group/", {users});
}

export function getAllGroup(){
    return send("GET", "/api/group/", null);
}

export function getMessages(id: string){
    return send("GET", "/api/message/"+id+"/", null);
}