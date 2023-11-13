import { send } from "./utils";

export function addFriend(username: string){
    return send("POST", '/api/'+username+"/friends/", null);
}

export function getChat(){
    return send("GET", "/api/chat/", null);
}
