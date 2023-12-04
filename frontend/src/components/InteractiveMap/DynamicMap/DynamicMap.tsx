"use client"
import { MapProps } from '@/components/InteractiveMap/InteractiveMap'
import dynamic from 'next/dynamic'

export default function DynamicMap({ width } : MapProps) {
  const Map = dynamic(
    () => import('@/components/InteractiveMap/InteractiveMap'),
    { 
      loading: () => <h1>Loading ヾ(＠⌒ー⌒＠)ノ</h1>,
      ssr: false
    }
  )
  return (<Map width={width}/>)
}