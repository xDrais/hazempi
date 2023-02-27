import Crowdfunding from "../components/crowdfunding/crowdfunding";
import ImageonTop from "../components/imageontop/Imageontop";
import Navbarr from "../components/Navbar/navbar";


function Crowdfundingpage(){
    return(
        <>
        <Navbarr/>
        <ImageonTop />
        <div align="center">
        <Crowdfunding/></div>
        </>
    )
}
export default Crowdfundingpage;