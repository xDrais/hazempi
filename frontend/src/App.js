import { lazy,Suspense  } from 'react';
import Login from './page/Login'
import {BrowserRouter as Router,Route,Routes,useNavigate} from 'react-router-dom';
import Register from './page/Register/register';
import Dashboard from './page/Dashboard';
import LessonDashboard from './page/LessonDashboard';
import CoursesDasbord from './page/CoursesDasbord';
import GetSponsor from './page/GetSponsor ';
import ProductDashboard from './page/Product/ProductDashboard';
import GetCoach from './page/GetCoach';
import Navbarr from './Components/Navbar/navbar';
import Loader from './Components/Loader';
import Home from './page/Home/home';
import  { useEffect, useState } from "react";
import UpdateUser from './page/Modifyaccount/updateUser'
import UpdateCoach from './page/Modifyaccount/updateCoach'
import UpdateSponsor from './page/Modifyaccount/updateSponsor'
import { useDispatch , useSelector , } from "react-redux";
import axios from "axios";
import UserDashboard from './page/UserDashboard/UserDashboard';
import ProductDetail from './page/ProductDetail/ProductDetail';
import Shop from './page/Shop/shop';
import Cart from './page/Cart/Cart';
import shipping from './page/Shipping/shipping'
import CourseDetail from './page/CourseDetail/CourseDetail';
import CoachDashboard from './page/CoachDashboard/CoachDashboard';
import UpdateCourses from './page/CoachDashboard/UpdateCourses';
import UpdateLesson from './page/CoachDashboard/UpdateLesson';
import Shipping from './page/Shipping/shipping';
import Payment from './page/Payment/payment';
import PlaceOrder from './page/PlaceOrder/PlaceOrder';
import Courses from './page/Courses/courses';
import OrderScreen from './page/Order/order';
import UpdateProduct from './page/UpdateProduct/UpdateProduct';
import ReactGA from 'react-ga';
import TEST from './page/CoachDashboard/test';
import CoursesChart from './page/CoachDashboard/CoursesChart';
import EnrollChart from './page/CoachDashboard/MostEnrolled';
import SuccessRate from './page/CoachDashboard/SuccessRate';
import AgeSectionPourcentage from './page/CoachDashboard/AgeSection';
import RoomPage from './page/room';



import {client} from './apollo.js'
import { ApolloProvider } from '@apollo/client';
import Project from './Components/Project/Project';
import Getallprojects from './Components/Project/Getallprojects';
import Addproject from './Components/Project/Addproject';
import Updateproject from './Components/Project/Updateproject';
import Getallevents from './Components/Eve/Getallevents';
import Event from './Components/Eve/Event';
import Updateevent from './Components/Eve/Updateevent';
import Addevent from './Components/Eve/Addevent';
import Calendar from './Components/FullCalendar/Calendar';
import AllProject from './page/Project/AllProject'
import DetailProject from './page/Project/DetailProject'
import Video from './page/Video/Video'
import HomePage from './page/Video/HomePage'


ReactGA.initialize('G-Y1V026ZHPY');


const ForgetPassword =lazy(() => import('./page/ForgetPassword'));
const ResetPassword = lazy(()=>import('./page/ResetPassword'))
const Profile = lazy(()=>import('./page/Profile'))

function App() {
  const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin
    const isAdmin = localStorage.getItem('adminRole') === 'true';

  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `http://localhost:5000/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
      console.log(data.user)
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
    console.log(getUser())
	}, []);
useEffect(()=>
{
  ReactGA.pageview(window.location.pathname + window.location.search);
})

  return (
    <ApolloProvider client={client}>
    <Suspense fallback={<Loader />}>
    <Router>
    {isAdmin ? (
    <Routes> 
    <Route path="/login" element={<> <Navbarr /> <Login/> </>} />
    <Route path="/register" element={<> <Navbarr /> <Register/> </>} />     
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/forget-password" element={<><Navbarr /> <ForgetPassword/> </>} />
    <Route path="/reset-password" element={<><Navbarr /><ResetPassword/> </>} />
    <Route path="/profile" element={<><Navbarr /> <Profile/> </>} />
    <Route path="/" element={<> <Home/> </>} />
    <Route exact  path="/sponsor/:id" element={ <GetSponsor/>} />
    <Route exact  path="/coach/:id" element={<GetCoach/>} />
    <Route path="/verify-email/:emailToken" element={<><Navbarr /><Login/> </>} />
    <Route path="/productdetail/:id">
  <Navbarr />
  <ProductDetail />
</Route>
    



    </Routes>
    
      
      ):(<Routes>
        <Route path="/login" element={<> <Navbarr /> <Login/></>} />
    <Route path="/register" element={<> <Navbarr /><Register/> </>} />     
    <Route path="/forget-password" element={ <> <Navbarr /><ForgetPassword/> </> } />
    <Route path="/reset-password" element={<> <Navbarr /> <ResetPassword/></>} />
    <Route path="/profile" element={<> <Navbarr /> <Profile/> </>} />
    <Route path="/" element={<><Home/></>} />
    <Route path="/productdetail/:id" element={<> <div className="bgdetail"><Navbarr /><ProductDetail/></div></>} />
    <Route path="/shop" element={<><Navbarr /><Shop/></>} />
    <Route path="/cart/:id?" element={<><Navbarr /><Cart/></>} />
    <Route path="/coursedetail/:id?" element={<><Navbarr /><CourseDetail/></>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/userupdate" element={<> <Navbarr /> <UpdateUser /> </> } /> 
    <Route exact  path="/sponsor/:id" element={ <GetSponsor/>} />
    <Route exact  path="/coach/:id" element={<GetCoach/>} />
    <Route path="/coachupdate" element={<> <Navbarr /> <UpdateCoach></UpdateCoach> </>} />
    <Route path="/spnsorupdate" element={<> <Navbarr /> <UpdateSponsor></UpdateSponsor> </>} />
    <Route path="/userdashboard" element={<><div className='yo'><Navbarr /> <UserDashboard></UserDashboard></div></> } /> 
    <Route path="/coachdashboard" element={<><div className='yo'><Navbarr /> <CoachDashboard/></div></> } /> 
    <Route path="/updatecourses/:id" element={<><div className='yo'><Navbarr /> <UpdateCourses/></div></> } /> 
    <Route path="/updatelessons/:id/:lessonId" element={<><div className='yo'><Navbarr /> <UpdateLesson/></div></> } /> 
    <Route path="/courses" element={<><div className='yo'><Navbarr /> <Courses/></div></> } /> 
    <Route path="/productdashboard" element={<ProductDashboard/>} />
    <Route path="/coursedashboard" element={<CoursesDasbord/>} />

    <Route path="/lessondashboard/:id" element={<LessonDashboard/>} />
    <Route path="/shipping" element={<Shipping/>} />
    <Route path="/payment" element={<Payment/>} />
    <Route path="/PlaceOrder" element={<PlaceOrder/>} />
    <Route path="/order/:id" element={<OrderScreen/>} />
    <Route path="/updateProduct/:id" element={<><div className='yo'><Navbarr /> <UpdateProduct></UpdateProduct></div></> } /> 
   










    <Route path="/project" element={<>   <Navbarr /> <Project/>  </> } />
    <Route path="/projects" element={<>    <Navbarr /> <AllProject/>  </> } />
    <Route path="/project/:id" element={<>    <Navbarr /> <DetailProject/>  </> } />
    <Route path="/addproject" element={<>   <Navbarr /> <Addproject/>  </> } />
    <Route path="/updateproject/:id" element={<>   <Navbarr /> <Updateproject/>  </> } />



    <Route path="/events" element={<>  <Navbarr />  <Getallevents/>  </> } />
    <Route path="/events" element={<>  <Navbarr />  <Getallevents/>  </> } />
    <Route path="/event/:id" element={<>   <Navbarr /> <Event/>  </> } />
    <Route path="/addevent" element={<> <Navbarr />   <Addevent/>  </> } />
    <Route path="/updateevent/:id" element={<> <Navbarr />   <Updateevent/>  </> } />

		<Route path="/video/:url" element={<><Navbarr /> <Video /></>} />
		<Route path="/meet" element={<><Navbarr /> <HomePage /></>} />


    <Route path="/calendar" element={<>  <Navbarr />  <Calendar/>  </> } />

















    <Route path="/verify-email/:emailToken" element={<><Navbarr /> <Login/> </>} />

    <Route path="/room/:roomId" element={<RoomPage/>} />

        </Routes>)}
    </Router>
    
    </Suspense>
    </ApolloProvider>

    
  );
}

export default App;
