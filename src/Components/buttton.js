import React from 'react'
import './button.css'

const Buttton = ({name, onClick}) => {
  return (
    <div>
       <button className='button-component' onClick={onClick}>{name}</button>
    </div>
  )
}

export default Buttton
