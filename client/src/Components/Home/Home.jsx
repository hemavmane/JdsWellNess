import React, { useEffect} from "react";
import "./Style/Home.css";
import Comp01 from "./Components/Comp01";
import Comp02 from "./Components/Comp02";
import Comp03 from "./Components/Comp03";
// import Comp04 from "./Components/Comp04";
import { Comp01Data } from "./Contents/Comp01Data";
import { Comp02Data } from "./Contents/Comp02Data";
// import { Comp04Data } from "./Contents/Comp04Data";
// import gdwimage from "../Images/gdwimage.jpg"
import TabsTitle from "../Utils/TabsTitle";

import ReactGA from "react-ga4";
const TRACKING_ID = "G-PJ3ERX3LDC"



const Home = () => {
  // TabsTitle("Health Consultancy : We care for your health!");
  useEffect(()=>{
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });
  },[])

  
  return (
    <div className="Home">
      <Comp01 data={Comp01Data} />
      <Comp02 data={Comp02Data} />
      <Comp03  />
      {/* <img src={gdwimage} alt="" /> */}
    </div>
  );
};

export default Home;
