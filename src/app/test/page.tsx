'use client'
import React from 'react'
import { ToolCreateAndTestForm } from '../app/tool/[slug]/ToolCreateAndTestForm'

export default function page() {
  return (
    <div>
        <ToolCreateAndTestForm setIsStepOneDirty={() => {}} />
    </div>
  )
}
