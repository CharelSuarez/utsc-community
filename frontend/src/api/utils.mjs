export function send(method, url, data){
    console.log(method, url, data)
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND}${url}`, {
        method: method,
        headers: {"Content-Type": "application/json"},
        body: (data)? JSON.stringify(data): null,
    })
    .then(x => x.json())
}
