"use client"
import React from 'react'
import Button from 'src/components/Button'

export default function PrintButton() {
  return (
    <div className='flex justify-end w-full mt-4'>
        <div className='w-min'> 
        <Button label="Print Complete Checklist" onClick={() => window.print()} />
        </div>
    </div>
  )
}
