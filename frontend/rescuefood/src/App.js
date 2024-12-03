
import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Topdonors from './components/Topdonors';
import Register from './components/Register';

function App() {
  return (
    <div className="App bg-gradient-to-r from-green-800 to-green-400 w-screen h-screen overflow-scroll">
    
    <Header/>
    <div className=''>
    <Routes>
    <Route path={"/"} element={<Home/>}/>
    <Route path={"/topdonors"} element={<Topdonors/>}/>
    <Route path={"/register"} element={<Register/>}/>

    </Routes>
    
  
    </div>
    </div>
   
  );
}

export default App;
