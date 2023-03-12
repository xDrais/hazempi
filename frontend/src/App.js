import logo from './logo.svg';
import Login from './page/Login'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Register from './page/Register/register';
import Dashboard from './page/Dashboard';
import Navbarr from './Components/Navbar/navbar';


function App() {
  return (
    <Router>
    <Navbarr />

    <Routes>
    
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />     
    <Route path="/dashboard" element={<Dashboard/>} />
  

    </Routes>
    </Router>
  );
}

export default App;
