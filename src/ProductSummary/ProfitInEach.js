import React,{useState} from 'react'
import axios from 'axios';
import "./ProfitInEach.css"
const ProfitInEach = () => {
    const [showList, setShowList] = useState(false);
  const [List , setList] = useState([]);

const handleprofitmade = async() =>{
  const profit = await axios.get("http://localhost:8081/FetchProduct/ProfitGenerated")
  const profitInEach = profit.data.ProfitMade.map((items) =>({
    Pname:items.Pname,
    sellingPrice:items.sellingPrice,
    BoughtPrice:items.BoughtPrice,
    ProfitGenerated:items.ProfitGenerated

  }))
  setList(profitInEach);


}


  const handleButtonClick = () => {
    handleprofitmade();
    setShowList(prevState => !prevState);
  };
  return (
    <div>
       <div>
        
      <button onClick={handleButtonClick}  className='InEachbtn'>Profit Per Each</button>
      <ul>
        
        {showList &&
          List.map((item, index) => (
            <li key={index} className="list-item" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className='Productname'>Product-Name--: { item.Pname}</div>
              <div className='Selliprice'>Product-SellingPrice--: { item.sellingPrice}</div>
              <div className='Boughtprice'>Product-BoughtPrice--: { item.BoughtPrice}</div>
              <div className='Profitgenerated'>ProfitGenerated-by-Product--: { item.ProfitGenerated}</div>
            </li>
          ))}
      </ul>
    </div>
    </div>
  )
}

export default ProfitInEach
