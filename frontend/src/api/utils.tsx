import { resetUser } from "./auth";

export function send(method: string, url: string, data: any): Promise<any> {
    console.log(method, url, data)
    return fetch(`${typeof window === 'undefined' || window.location.href.startsWith("http://localhost") ? process.env.NEXT_PUBLIC_BACKEND : ''}${url}`, {
        credentials: 'include',
        method: method,
        headers: {
            "Content-Type": "application/json",
            //'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
        body: data ? JSON.stringify(data): null,
    })
    .then((response) => {
        if (response.status < 200 || response.status >= 300) {
            // If unauthorized, reset user and go back to home page!
            if (response.status == 401) {
                console.log("Unauthorized, redirecting!")
                resetUser();
                window.location.href = '/';
            }
            return null;
        }
        return response.json();
    })
}

export function sendForm(method: string, url: string, data: any) : Promise<any> {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          const value = data[key];
          formData.append(key, value);
        });
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.onload = function () {
            if (xhr.status < 200 || xhr.status >= 300) {
                // If unauthorized, reset user and go back to home page!
                if (xhr.status == 401) {
                    console.log("Unauthorized, redirecting!")
                    resetUser();
                    window.location.href = '/';
                }
                return resolve(null);
            }
            resolve(JSON.parse(xhr.responseText))
        };
        xhr.onerror = function () {
            resolve(null);
        }
        xhr.open(method, `${typeof window === 'undefined' || window.location.href.startsWith("http://localhost") ? process.env.NEXT_PUBLIC_BACKEND : ''}${url}`, true);
        if (!data) {
            xhr.send();
        } else {
            xhr.send(formData);
        }
    });
}
