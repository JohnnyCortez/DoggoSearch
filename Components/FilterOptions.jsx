import { useState } from "react";

function FilterOptions(props) {

  return (
    <div className="filters">
      <label>
        Age:
        <select name="age" value={props.filters.age} onChange={props.handleChange}>
          <option value="">--Select Age--</option>
          <option value="Baby">Baby</option>
          <option value="Young">Young</option>
          <option value="Adult">Adult</option>
          <option value="Senior">Senior</option>
        </select>
      </label>
    </div>
  );
}

export default FilterOptions;
