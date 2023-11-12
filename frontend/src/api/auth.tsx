import { send } from "./utils.mjs";

export function login(username: string){
    return send("GET", '/api/friends/'+username+"/", null);
}