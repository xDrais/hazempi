import './App.css';
import Navbar from './Components/Navbar/navbar.js';
import Events from './Components/events/events.js';
import Section1 from './Components/section1/section1.js';
import Partenairec from './Components/partenairescarousel/partenairec.js';
import HeroSection from './Components/HeroSection/HeroSection.js';
import Products from './Components/Products/products.js';
import Crowdfunding from "./Components/crowdfunding/crowdfunding.js";
import SignUpPartner from './Components/signup/signupPartner';
import { Provider } from 'react-redux';
import {store} from './App/store'
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom';
import Crowdfundingpage from './pages/productdetail';
import CoursesPage from './pages/CoursesPage';
import Loginpage from './pages/Login';
import PreSignUpPage from './pages/PreSignUpPage';
import SignupPage from './pages/Signup';
import LoginScreen from './screens/LoginScreen.js';
import Login from './Components/login/login.js';
function App() {
  return (
    <div className="App">
    <Navbar />
    <HeroSection />
    <div align="center" className="eventbackground">
    <Events /> </div>
    <Products />

        <Section1 />
        <div align="center">
        <Crowdfunding /></div>
          <br />
        <Partenairec />
     <br />
    </div>
    // <Router>
    //   <main className='py-3'>
    //     <Container>
    //         <Route path='/login' component={LoginScreen} />
    //     </Container>

    //   </main>
    // </Router>

  );
}

export default App;
