import CustomDataTable from '@/components/backoffice/CustomDataTable'
import React from 'react'

export default function 
() {
  return (
    <div className='mt-8 px-4'>
        <h2 className='text-2xl font-bold'>
          Orders
        </h2>
        <div className='mt-5'>
          <CustomDataTable/>
        </div>
    </div>
    
  )
}
