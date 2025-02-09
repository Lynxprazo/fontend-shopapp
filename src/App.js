import React  from 'react';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Home from './home';
import Login from './login';
import Services from './services';
import Registration from './registration';
import DB from './debits/debits';
import Profit from './profit/profit';
import Daily from "./DailyBulk/Daily"
import './App.css'
import StockTracker from './Stock/StockTracker';
import Prepackage from './DailyPre-Package/Prepackage';
import ProfitSummary from './ProductSummary/ProfitSummary';

// createBrowserRouter used to provide routing functionalty
const roy = createBrowserRouter([
  {
    path:"/",
    element:<Navigate to = "/Login"/>
  },

  {
    path: "/Dashboard",
    element :<Home/>,
  
  },
  {
    path: "/Login",
    element:<Login/>
  },
  {
    path: "/services",
    element:<Services/>
     
  },
  {
    path:"/Register",
    element:<Registration/>
  },
  {
    path:"/debits",
    element:<div>
    <DB/>
    
    </div>
  },
  {
    path:"/Profit",
    element:<Profit/>
  },
  {
    path: "/Daily",
   element: <Daily/>
  },
  {
    path:"/Stock",
    element:<StockTracker/>
  
},
{
  path:"/Jumla",
  element:<Prepackage/>
},
{
  path:"/ProductSummary",
  element:<ProfitSummary/>
}
 

 

])
const App = () => {
  return (
    <div className='all-in'>
    <RouterProvider router={roy} />
    </div>
   
  )
}

export default App
