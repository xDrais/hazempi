import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '150px',
        height: '150px',
        margin: 'auto',
        display: 'block',
        position : 'relative',
        zIndex: 100,
        color: 'black'
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader