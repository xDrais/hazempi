import logo from './logo.svg';
import Login from './page/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './page/Register/register';
import Dashboard from './page/Dashboard';
import GetSponsor from './page/GetSponsor ';
import GetCoach from './page/GetCoach';
import Navbarr from './Components/Navbar/navbar';
import { useContext } from "react";

function App() {

  return (
    <Router>
    <Navbarr />

    <Routes>
    
    <Route path="/login" element={ <Login /> } />
    <Route path="/register" element={<Register/>} />     
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route exact  path="/sponsor/:id" element={<GetSponsor/>} />
    <Route exact  path="/coach/:id" element={<GetCoach/>} />


    </Routes>
    </Router>
  );
}


export default App;
