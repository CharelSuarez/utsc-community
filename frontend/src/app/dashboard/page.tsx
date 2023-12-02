"use client"
import Sidebar from "@/components/Social/Sidebar/Sidebar";
import dynamic from 'next/dynamic'
import "./dashboard.css"

export default function Page() {
  const Map = dynamic(
    () => import('@/components/InteractiveMap/InteractiveMap'),
    { 
      loading: () => <h1>Loading ヾ(＠⌒ー⌒＠)ノ</h1>,
      ssr: false
    }
  )
  return (
    <>
      <div className="map_content">
        <Sidebar />
        <Map/>
      </div>
    </>
  )
}