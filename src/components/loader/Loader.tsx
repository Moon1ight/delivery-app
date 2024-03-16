import React from 'react'
import './styles.scss'

const Loader = () => {
  return (
    <div className='delivery-loader'>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader