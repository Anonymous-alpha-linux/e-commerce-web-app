import React from 'react'

export default function Post({children,...restProp}) {
  return (
    <div className='post' {...restProp}>
        {children}
    </div>
  )
}
