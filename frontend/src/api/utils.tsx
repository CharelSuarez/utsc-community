export function send(method: string, url: string, data: any): Promise<any> {
    console.log(method, url, data)
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND}${url}`, {
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
            return null;
        }
        return response.json();
    })
}
