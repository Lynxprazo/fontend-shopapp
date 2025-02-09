import React,{useState} from 'react'
import axios from 'axios'
import "./msProfitInEach.css"

const MsProfitIneach = () => {
    const [isOpen , setisOpen] = useState(false)
    const [msProfitList, setmsProfitList] = useState([])
    const handleOnclickbtn = (e) =>{
        e.preventDefault()
        setisOpen(prevOpen => !prevOpen)
        handleProfitIneach()
    }
    const handleProfitIneach = async() =>{
        try{
            const response = await axios.get("http://localhost:8081/FetchProduct/profitBulksale")
            const ProfitList = response.data.ProfitBulksales.map((item) =>({
                ProductName:item.Pname,
                sellingPrice:item.sellingPrice,
                BoughtPrice:item.BoughtPrice,
                Weight:item.WEIGHT,
                ValueInKg:item.ValueInKg,
                PofitInEach : item.PofitInEach




            }))
            setmsProfitList(ProfitList)
        }
        catch(err){
          return console.error({message:"Failed to Connect With Server"})
        }
       
    }

  return (
    <div>
      <div>
        <button className='msInEachbtn' onClick={handleOnclickbtn}>ProfitMade by Bulksales</button>
      </div>
      <ul>
        {isOpen && msProfitList.map((item,index)=>(
            <li key={index} className='mslist-item' style={{animationDelay:`${index * 0.2}s`}}>
                <div className='msProductname'>ProductName:- {item.ProductName}</div>
                <div className='msSellingprice'>sellingPrice:- {item.sellingPrice}.sh</div>
                <div className='msBoughtprice'>BoughtPrice:- {item.BoughtPrice}.sh</div>
                <div className='msWeight'>Package_Weight:-{item.Weight}.kg</div>
                <div className='msValue'>Value Per kg:-{item.ValueInKg}.sh</div>
                <div className='msProfitgenerated'>Profit Generated-:{item.PofitInEach}</div>
            </li>
        ))}
  
      </ul>
    </div>
  )
}

export default MsProfitIneach
