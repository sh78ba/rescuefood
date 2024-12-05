import { Route, Routes, useLocation } from 'react-router';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Topdonors from './components/Topdonors';
import Register from './components/Register';
import LoginSignup from './components/LoginSignUp/LoginSignup';
import Restauranthome from './components/Restaurant/Restauranthome';
import Navbar from './components/Restaurant/Navbar';


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
          <Route path="/register/restaurant" element={<LoginSignup heading={"Restaurant"} />} />
          <Route path="/register/restaurant/afterlogin" element={<Restauranthome />} />
          {/* Add additional restaurant routes */}
          <Route path="/register/restaurant/dashboard" element={<Restauranthome />} />
          <Route path="/register/restaurant/profile" element={<Restauranthome />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
