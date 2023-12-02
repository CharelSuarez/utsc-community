import { send } from "./utils";

export function addEvent(name: string, description: string, start: string, end: string, location: string, createdBy: string){
    const createTime = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);
    return send("POST", "/api/event/", {name, description, startDate, endDate, location, createdBy, createTime});
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