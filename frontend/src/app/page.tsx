'use client'

import Body from '@/components/Body/Body'
import Sidebar from '@/components/Social/Sidebar/Sidebar'
import Taskbar from '@/components/Taskbar/Taskbar'

export default function Home() {
  return (  
    <>
        <Sidebar update={()=>null} active='' />
        <Body />

    </>
  )
}
