import React from 'react'
import ProfitInEach from './ProfitInEach'
import NEW from '../NEW'
import "./ProfitSummary.css"
import MsProfitIneach from './msProfitIneach'
import OverSummary from './OverSummary'

const ProfitSummary = () => {
  return (
    <div className='Psummary-container'>
        <div><NEW/></div>
        <div className='Pcomponent-Container'>
        <ProfitInEach/>
        <MsProfitIneach/>
        <OverSummary/>
      
        </div>
     
    </div>
  )
}

export default ProfitSummary
