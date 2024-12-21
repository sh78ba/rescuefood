import { Route, Routes, useLocation } from 'react-router';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Topdonors from './components/Topdonors';
import Register from './components/Register';
import Login from './components/LoginPage/Login';
import Restauranthome from './components/Restaurant/Restauranthome';
import Navbar from './components/Restaurant/Navbar';
import Profile from './components/cards/Profile';
import Kycform from './components/Kycform';


function App() {
  const location = useLocation();

  // Paths where the RestaurantHeader should be displayed
  const restaurantPaths = [
    "/register/restaurant/afterlogin",
    "/register/restaurant/dashboard",
    "/register/restaurant/profile"
  ];

  const isRestaurantHeader = restaurantPaths.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="App bg-gradient-to-r from-green-800 to-green-400 w-screen h-screen overflow-scroll">
      {/* Conditionally render different headers */}
      {isRestaurantHeader ? <Navbar /> : <Header />}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topdonors" element={<Topdonors />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/restaurant" element={<Login heading={"Restaurant"} userType={"restaurant"}/>} />
         
          {/* Add additional restaurant routes */}
          <Route path="/register/restaurant/dashboard" element={<Restauranthome />} />
          <Route path="/register/restaurant/profile" element={<Profile />} />
          <Route path="/kycform" element={<Kycform />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
