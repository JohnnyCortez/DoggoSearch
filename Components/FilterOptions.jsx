import { useState } from "react";


function FilterOptions(props) {

  return (
    <div className="filters">
        <h3>Filter Options</h3>
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
      <label>
        Size:
        <select name="size" value={props.filters.size} onChange={props.handleChange}>
          <option value="">--Select Size--</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </label>
      <label>
        Gender:
        <select name="gender" value={props.filters.gender} onChange={props.handleChange}>
          <option value="">--Select Gender--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
    </div>
  );
}

export default FilterOptions;
