
import HeroSection from "../../Components/HeroSection/HeroSection"
import Events from '../../Components/events/events';
import Section1 from '../../Components/section1/section1';
import Partenairec from '../../Components/partenairescarousel/partenairec';
import Products from '../../Components/Products/products';
import Crowdfunding from "../../Components/crowdfunding/crowdfunding";
import Popchat from '../ChatPop/Popchat.js'
function Home(){

const msgs = ['hey, whatsup!', 'my oh, how ya doin ??', 
'you know, chhht, like that..', 'wanna meet ? afternoon']
const getMessage = (msg) => {
     console.log(msg)
}


return(

<>
<HeroSection />
{/* <div align="center" className="eventbackground">
<Events/> </div> */}


     <Section1 />
     <div>
<Popchat messages={msgs} getMessage={getMessage} />
</div>
     <Products/>
     <div align="center">
     <Crowdfunding /></div>
<br />

     <Partenairec />
     <br />
     </>);
}
export default Home