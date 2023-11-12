import { send } from "./utils";

export function addFriend(username: string){
    return send("POST", '/api/'+"bob"+"/friends/", {friend: username});
}

export function getChat(username: string){
    return send("GET", "/api/bob/chat/", null);
}
