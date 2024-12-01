import React from "react";

import img from "../components/images/section.webp";
import Card from "./cards/Card";
import homeimg from "./images/home.jpg"
import requestfoodimg from "./images/reqfood.jpg"
import foodimg from "./images/food.jpg"
import contactus from "./images/contactus.png"
import QuotesCard from "./cards/Quotescard"

const Home = () => {
  return (
    <div>
      <div>
        <img src={img} alt="section-img" className="h-72 w-screen opacity-85 "></img>
      </div>
      <div className="flex  justify-between mx-5">
    
        <Card heading={"Home"} buttonname={"Donate"} imagelink={homeimg}/>
        <Card heading={"Donate Food"} buttonname={"Donate Food"} imagelink={requestfoodimg}/>
        <Card heading={"Request Food"} buttonname={"Request Food"} imagelink={foodimg} />
        <Card heading={"Contact Us"} buttonname={"Contact Us"} imagelink={contactus} bgcolor={"orange"}/>

        
      </div>
     <div>
     <QuotesCard/>
     </div>
      
    </div>
  );
};
export default Home;
