import { send } from "./utils";

interface User {
    _id: string;
    username: string;
}

export function login(username: string, password: string) : Promise<User> {
    return send("POST", '/api/login/', {username, password})
        .then((user) => {
            if (user) {
                localStorage.setItem('user_id', user._id);
                localStorage.setItem('username', user.username);
            }
            return user;
        }
    );
}

export function register(username: string, password: string) : Promise<User> {
    return send("POST", '/api/register/', {username, password})
        .then((user) => {
            if (user) {
                localStorage.setItem('user_id', user._id);
                localStorage.setItem('username', user.username);
            }
            return user;
        }
    );
}

export function logout() : Promise<any> {
    return send("DELETE", '/api/login/', null)
        .then((response) => {
            if (response) {
                localStorage.removeItem('user_id');
                localStorage.removeItem('username');
            }
        }
    );
}

export function getUserId() {
    return localStorage.getItem('user_id');
}

export function getUsername() {
    return localStorage.getItem('username');
}