import './App.css';
import Navbar from './components/Navbar/navbar';
import Events from './components/events/events';
import Section1 from './components/section1/section1';
import Partenairec from './components/partenairescarousel/partenairec';
import HeroSection from './components/HeroSection/HeroSection';
import Products from './components/Products/products';
import Crowdfunding from "./components/crowdfunding/crowdfunding";
import SignUpPartner from './components/signup/signupPartner';

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
  );
}

export default App;
