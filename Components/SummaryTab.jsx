import { useState } from "react";


function SummaryTabs(props) {
  return (
    <div className="summary">
      <h3>Summary Stats</h3>
      <p>{`Most Common Age: ${props.ageMode}`}</p>
      <p>{`Most Common Size: ${props.sizeMode}`}</p>
      <p>{`Most Common Gender: ${props.genderMode}`}</p>
      <p>{`Total Shiba Inus: ${props.count}`}</p>
    </div>
  );
}

export default SummaryTabs;
