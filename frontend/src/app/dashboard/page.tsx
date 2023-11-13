import Taskbar from "@/components/Taskbar/Taskbar";

import dynamic from 'next/dynamic'

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
        <Taskbar/>
        <Map/>
    </>
  )
}