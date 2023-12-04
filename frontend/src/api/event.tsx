import { send } from "./utils";

export function addEvent(name: string, description: string, start: Date, end: Date, location: string, createdBy: string){
    const createTime = new Date();
    return send("POST", "/api/event/", {name, description, start, end, location, createdBy, createTime});
}

export function getEvents(page: number, startDateFilter: string, endDateFilter: string, locationFilter: string){
    return send("GET", "/api/events?page=" + page + "&startDateFilter=" + startDateFilter + "&endDateFilter=" + endDateFilter + "&locationFilter=" + locationFilter, null);
}

export function attendEvent(attendee: string, eventId: string){
    return send("PATCH", "/api/attendevent/", {attendee, eventId});
}

export function unattendEvent(attendee: string, eventId: string){
    return send("PATCH", "/api/unattendevent/", {attendee, eventId});
}

export function cancelEvent(eventId: string){
    return send("Delete", "/api/event/" + eventId , null);
}