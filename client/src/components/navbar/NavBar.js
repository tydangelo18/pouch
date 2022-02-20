import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  // Whatever path is in the url, that state will change
  //  so the active highlight will be on the correct menu item in the navbar
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);

  const [activeItem, setState] = useState(path);

  const handleItemClick = (e, { name }) => {
    setState(name);
  };

  return (
    <div title="navbar">
      <Menu pointing secondary size="massive" color="orange">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          to="/"
          title='menuOption'
          as={Link}
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            to="/register"
            title='menuOption'
            as={Link}
          />
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            to="/login"
            title='menuOption'
            as={Link}
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default NavBar;
