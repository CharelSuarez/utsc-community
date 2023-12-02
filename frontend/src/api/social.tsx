import { send } from "./utils";

export function addFriend(username: string){
    return send("POST", "/api/friends/"+username+"/", null);
}

export function getFriends(){
    return send("GET", "/api/friends/", null);
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

export function getAllUsers(){
    return send("GET", "/api/allUsers/", null);
}