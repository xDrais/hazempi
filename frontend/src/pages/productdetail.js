import Crowdfunding from "../Components/crowdfunding/crowdfunding";
import ImageonTop from "../Components/imageontop/Imageontop";
import Navbarr from "../Components/Navbar/navbar";


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