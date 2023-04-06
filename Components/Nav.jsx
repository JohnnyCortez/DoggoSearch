import React from "react";
import { Link } from "react-router-dom";

function Nav(props) {

  return (
    <div>
      <Link to="/"> Home</Link>
      <br />
      <Link to={`/SummaryGraph`} state={props.pets}>
        Summary Graph
      </Link>
    </div>
  );
}
export default Nav;
