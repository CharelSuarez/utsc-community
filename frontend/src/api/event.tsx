import { send } from "./utils";

export function addEvent(name: string, description: string, startDate: string, endDate: string, location: string){
    return send("POST", "/api/event/", {name, description, startDate, endDate, location});
}

export function getEvents(page: number){
    return send("GET", "/api/events/:page", null);
}

