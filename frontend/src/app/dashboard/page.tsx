"use client"
import Sidebar from "@/components/Social/Sidebar/Sidebar";
import "./dashboard.css"
import DynamicMap from "@/components/InteractiveMap/DynamicMap/DynamicMap";

export default function Page() {
  return (
    <>
      <div className="map-content">
        <Sidebar active="Map"/>
        <DynamicMap width={350 + 700}/>
      </div>
    </>
  )
}