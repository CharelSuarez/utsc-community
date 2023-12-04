"use client";
import Filter from "@/components/Map/FilterEvent/Filter";
import Events from "@/components/Map/Events/Events";
import Pagination from "@/components/Map/Pagination/Pagination";
import Sidebar from "@/components/Social/Sidebar/Sidebar";
import Header from "@/components/Map/Header/Header"
import { useState } from "react";
import "./page.css"
import DynamicMap from "@/components/InteractiveMap/DynamicMap/DynamicMap";

export default function Page() {
    const [addedEventFunction, setAddedEventFunction] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [location, setLocation] = useState("");
    const [currentEvent, setCurrentEvent] = useState<any | null>(null);

    return (
        <div className="map">
            <Sidebar active="Events"></Sidebar>
            <div className="filterAndEvents">
                <Header title="Find and Create Events"></Header>
                <Filter onAddFunction={setAddedEventFunction} setStartDate={setStartDate} setEndDate={setEndDate} setLocation={setLocation}></Filter>
                <Events pageNumber={pageNumber} setPageNumber={setPageNumber} onAdd={addedEventFunction} onAddFunction={setAddedEventFunction}
                    startDateFilter={startDate} endDateFilter={endDate} locationFilter={location} setCurrentEvent={setCurrentEvent}></Events>
                <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber}></Pagination>   
            </div>
            <DynamicMap width={350 + 700} currentEvent={currentEvent} setCurrentEvent={setLocation}></DynamicMap>
        </div>
    );
  }