import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";


function Header() {

  const user = JSON.parse(localStorage.getItem("userData"));
  // console.log(user);


  const userName = user?.username;
  const Name = userName?.charAt(0).toUpperCase() + userName?.substr(1);

  const location = useLocation();
  const pathname = location.pathname;
  // console.log("pathname",pathname)
  let sidenavName = "";

  if (pathname === "/dashboard") {
    sidenavName = "Add Product";
  }
 
  // Now, `filteredNotifications` contains notifications without the "New notification" text.

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{
          backgroundColor: "#F9F9F9",
        }}
      >
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="m-auto ">
            <div className=" me-0">
              {" "}
              <h4 style={{color:""}}>{sidenavName}</h4>
            </div>

          </Nav>
          <div className="col-md-2">
            {" "}
            <h6>{Name}</h6>
          </div>

        </Navbar.Collapse>
      </Navbar>{" "}
    </>
  );
}

export default Header;
