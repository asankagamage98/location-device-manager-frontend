import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "flowbite-react";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Device Manager
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#" onClick={(e) => navigate("/")} active>
          Home
        </Navbar.Link>
        <Navbar.Link onClick={(e) => navigate("/device")} href="#">
          New Device
        </Navbar.Link>
        <Navbar.Link href="#" onClick={(e) => navigate("/location")}>
          New Location
        </Navbar.Link>
        <Navbar.Link href="#" onClick={(e) => navigate("/viewLocations")}>
          Existing Locations
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
