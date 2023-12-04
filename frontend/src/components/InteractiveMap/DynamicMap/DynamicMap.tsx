"use client"
import { MapProps } from '@/components/InteractiveMap/InteractiveMap'
import dynamic from 'next/dynamic'
import { memo } from 'react'

const DynamicMap = memo(function DynamicMap(mapProps : MapProps) {
  const InteractiveMap = dynamic(
    () => import('@/components/InteractiveMap/InteractiveMap'),
    { 
      loading: () => <h1>Loading ヾ(＠⌒ー⌒＠)ノ</h1>,
      ssr: false
    }
  )
  return <InteractiveMap {...mapProps}/>
});//, () => true);

export default DynamicMap;
