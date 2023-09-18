import React from 'react'

export default function KeyandValueIcons({child, title, value}) {
  return (
    <div className='flex font-light text-sm items-center justify-center'>
      {child}
      {title}:
      <span className='font-medium ml-1'>{value}</span>
    </div>
  )
}
