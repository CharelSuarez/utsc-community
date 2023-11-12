import { send } from "./utils";

export function login(username: string, password: string) : Promise<any> {
    return send("POST", '/api/login/', {username, password});
}

export function register(username: string, password: string) : Promise<any> {
    return send("POST", '/api/register/', {username, password});
}

export function logout() : void {
    send("DELETE", '/api/login/', null);
}