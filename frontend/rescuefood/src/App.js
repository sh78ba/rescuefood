import { Route, Routes, useLocation } from 'react-router';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Topdonors from './components/Topdonors';
import Register from './components/Register';
import Login from './components/LoginPage/Login';
import Restauranthome from './components/Restaurant/Restauranthome';
import Profile from './components/cards/Profile';
import Kycform from './components/Kycform';
import DashboardVolunteer from './components/Volunteer/DashboardVolunteer';
import RestaurantSignUp from "./components/Restaurant/RestaurantSignup"
import VolunteerSignup from './components/Volunteer/VolunteerSignUp';
import GMap from './components/maps/GMap';

function App() {
  const location = useLocation();
  const userType = localStorage.getItem("type");
  // Paths where the RestaurantHeader should be displayed
 

  return (
    <div className="App ">
      {/* Conditionally render different headers */}
      {/* {userType === "restaurant" ? (
        <Navbar />
      ) : userType === "volunteer" ? (
        <Navbar />
      ) : (
        <Header />
      )} */}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topdonors" element={<Topdonors />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurant/login" element={<Login heading={"Restaurant"} userType={"restaurant"}/>} />
         
          {/* Add additional restaurant routes */}
          <Route path="/restaurant/dashboard/*" element={<Restauranthome />} />
          <Route path="/restaurant/signup" element={<RestaurantSignUp />} />
          <Route path="/kycform" element={<Kycform />} />


        {/*Paths for volunteer*/}
          <Route path='/volunteer/dashboard' element={<DashboardVolunteer/>}/>
          <Route path="/volunteer/login" element={<Login heading={"Volunteer"} userType={"volunteer"}/>} />
          <Route path='/volunteer/signup' element={<VolunteerSignup/>}/>


        <Route path='/volunteer/map' element={<GMap/>}/>

        </Routes>
      </div>
    </div>
  );
}

export default App;
