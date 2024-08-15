import React from "react";
import Signup from './pages/Signup';
import DashBoard from './pages/DashBoard';
import Signin from './pages/Signin';
import SendMoney from './pages/SendMoney';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from "./pages/Home";


function App() {

  return (
    <div>
    
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home></Home>}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/dashboard"
          element={<DashBoard nameOfApp={"NiropaySanu"} />}
        />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
        
    
    </div>
  )
}

export default App
