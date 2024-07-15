import React from "react";
import "./Style/Footer.css";
import { useNavigate, Link } from "react-router-dom";

import { MdOutlineMarkEmailRead } from "react-icons/md";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="Footer">
      <div className="FooterContainer_01">
        <div className="FooterPolicy FooterContentContainers">
          <h3>Policy</h3>
          <ul>
          <li
             onClick={() => navigate("/policy/ShippingPolicy")}
             >
              Shipping Policy
            </li>
            <li 
            onClick={() => navigate("/policy/ReturnPolicy")}
            >
              Return Policy
            </li>
            <li
             onClick={() => navigate("/policy/privacyPolicy")}
             >
              Privacy Policy
            </li>

            <li onClick={() => navigate("/termsAndConditions")}>Terms & Conditions</li>
          </ul>
        </div>
        <div className="FooterFollowUs FooterContentContainers">
          <h3>Follow Us</h3>
          <ul>
            <li><Link >Instagram</Link></li>
            <li><Link >Facebook</Link></li>
            <li><Link >Linkedin</Link></li>
            <li><Link >WhatsApp</Link></li>
          </ul>
        </div>
        {/* <div className="FooterAddress FooterContentContainers" style={{marginTop:"38px"}}> */}
        <div className="FooterAddress FooterContentContainers" >
          <h3>Address</h3>
          <ul>
            <li style={{fontWeight:"bold"}}>GD WELLNESS LLC</li>
            <li>East Brunswick, New Jersey</li>
            {/* <li>Phone : +1 718 395 7786</li> */}
            {/* <li>Email : Support@gdswellness.com</li> */}
            <li>
              Phone : +1 718 395 7786
            </li>
            
            <li>Email : Support@gdswellness.com</li>
            {/* <li style={{display:"flex",alignItems:"center"}}>email : support@gdwellness.shop</li> */}
          </ul>
        </div>
      </div>

      <div className="FooterContainer_02">
        {/* <p>
          {"© 2024 Health Consultancy : Developed by "}
          <Link
            style={{
              color: "#FF006E",
              textDecoration: "none",
              fontWeight: "500",
            }}
            to="https://www.justoconsulting.com/"
            target="_blank"
          >
            Justo Consulting
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default Footer;
