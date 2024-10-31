"use client"
import React from 'react'
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

const WhiteBoard = () => {
  return (
    <div className="mt-20 h-5/6" style={{ position: 'fixed', inset: 0 }}>
      <Tldraw />
    </div>
  )
}

export default WhiteBoard
