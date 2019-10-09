import React from 'react'

const Space = (props) => {
  return(
    <button className='square'
      onClick={ props.onClick }
    >
      { props.value }
    </button>
  )
}

export default Space
