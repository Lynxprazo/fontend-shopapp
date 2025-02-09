import React,{useState} from 'react'
import "./Overallsummary.css"


const ProgressCircle = () => {
  const[isAnimated , setAnimated] = useState(false);
  const  toogle =()=>{
    setAnimated(!isAnimated)
  }
   
  return (
    <div className='main-containerCirle'>
        <div onClick={toogle} className={`Outer ${isAnimated ?"Progressive" : ''}`}>
            <div className='inner'>

            </div>
        </div>
        <div onClick={toogle} className={`Outer ${isAnimated ?"Progressive" : ''}`} >
            <div  className='inner'>

            </div>
        </div>
        <div onClick={toogle} className={`Outer ${isAnimated ?"Progressive" : ''}`}>
            <div  className='inner'>

            </div>
        </div>
     
      
    </div>
  )
}

export default ProgressCircle
