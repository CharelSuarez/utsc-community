import { send, sendForm } from "./utils";

interface User {
    _id: string;
    username: string;
}

export function login(username: string, password: string) : Promise<User> {
    return send("POST", '/api/login/', {username, password})
        .then((user) => {
            if (user) {
                setUser(user);
            }
            return user;
        }
    );
}

export function register(username: string, password: string, avatar: any) : Promise<User> {
    return sendForm("POST", '/api/register/', {username, password, avatar})
        .then((user) => {
            if (user) {
                setUser(user);
            }
            return user;
        }
    );
}

export function logout() : Promise<any> {
    return send("DELETE", '/api/login/', null)
        .then((response) => {
            if (response) {
                resetUser();
            }
        }
    );
}

function setUser(user: any) {
    if (typeof window === 'undefined') {
        return null;
    }
    localStorage.setItem('user_id', user._id);
    localStorage.setItem('username', user.username);
}

export function getUserId() {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage.getItem('user_id');
}

export function getUsername() {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage.getItem('username') || "";
}

export function resetUser() {
    if (typeof window === 'undefined') {
        return null;
    }
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
}