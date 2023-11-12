import { send } from "./utils.mjs";

export function getFriend(username: string){
    return send("GET", '/api/friends/'+username+"/", null);
}