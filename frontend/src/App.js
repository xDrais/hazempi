import { lazy,Suspense  } from 'react';
import Login from './page/Login'
import {BrowserRouter as Router,Route,Routes,useNavigate} from 'react-router-dom';
import Register from './page/Register/register';
import Dashboard from './page/Dashboard';
import GetSponsor from './page/GetSponsor ';
import GetCoach from './page/GetCoach';
import Navbarr from './Components/Navbar/navbar';
import Loader from './Components/Loader';
import Home from './page/Home/home';
import  { useEffect, useState } from "react";
import { useDispatch , useSelector , } from "react-redux";
import axios from "axios";
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


  return (
    <Suspense fallback={<Loader />}>
    <Router>
    {isAdmin ? (
    <Routes> 
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />     
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/forget-password" element={<><Navbarr /> <ForgetPassword/> </>} />
    <Route path="/reset-password" element={<><Navbarr /><ResetPassword/> </>} />
    <Route path="/profile" element={<><Navbarr /> <Profile/> </>} />
    <Route path="/" element={<><Navbarr /> <Home/> </>} />
    <Route exact  path="/sponsor/:id" element={ <GetSponsor/>} />
    <Route exact  path="/coach/:id" element={<GetCoach/>} />
    <Route path="/verify-email/:emailToken" element={<><Navbarr /><Login/> </>} />



    </Routes>
    
      
      ):(<Routes>
        <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />     
   
    <Route path="/forget-password" element={<ForgetPassword/>} />
    <Route path="/reset-password" element={<ResetPassword/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/" element={<Home/>} />
    <Route exact  path="/sponsor/:id" element={<GetSponsor/>} />
    <Route exact  path="/coach/:id" element={<GetCoach/>} />
    <Route path="/verify-email/:emailToken" element={<Login/>} />
        </Routes>)}
    </Router>
    
    </Suspense>
    
  );
}

export default App;
