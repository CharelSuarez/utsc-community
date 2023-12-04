import { send } from "./utils";

export function addFriend(friend: string){
    return send("POST", "/api/friends/", {friend});
}

export function getFriends(){
    return send("GET", "/api/friends/", null);
}

export function addGroup(users: string[], name: string){
    return send("POST", "/api/group/", {users, name});
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

export function addRequest(friend: string){
    return send("POST", "/api/request/", {friend});
}

export function getRequest(){
    return send("GET", "/api/request/", null);
}

export function removeFriend(friend: string){
    return send("PATCH", "/api/friends/", {friend});
}
