"use client"
import { MapProps } from '@/components/InteractiveMap/InteractiveMap'
import dynamic from 'next/dynamic'
import { memo } from 'react'

const DynamicMap = memo(function DynamicMap(mapProps : MapProps) {
  const InteractiveMap = dynamic(
    () => import('@/components/InteractiveMap/InteractiveMap'),
    { 
      loading: () => {
        return (
          <div className='loading-div' style={{width: `calc(100% - ${mapProps.width}px)`}}>

          </div>
        )
      },
      ssr: false
    }
  )
  return <InteractiveMap {...mapProps}/>
});//, () => true);

export default DynamicMap;
