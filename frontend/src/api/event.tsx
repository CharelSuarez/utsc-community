import { send } from "./utils";

export function addEvent(name: string, description: string, startDate: string, endDate: string, startTime: string, endTime: string, location: string, createdBy: string){
    return send("POST", "/api/event/", {name, description, startDate, endDate, startTime, endTime, location, createdBy});
}

export function getEvents(page: number){
    return send("GET", "/api/events/:page", null);
}

