import React from "react";
import { Link } from "react-router-dom";


function Nav(props) {
  return (
    <div>
        <Link to="/"> Home
        </Link>
        <br/>
        <Link to="/" > Summary Graph
        </Link>
    </div>
  );
}

export default Nav;