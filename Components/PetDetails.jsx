import React from "react";
import { useLocation } from "react-router-dom";


function PetDetails(props) {
    const location = useLocation();

    const {pet} = location.state;
    console.log(pet)
  return (
    <div>
      <h2>{pet.name}</h2>
      <img src={pet.photos[0].large} alt={pet.name} />
      <p>{`Gender: ${pet.gender}`}</p>
      <p>{`Age: ${pet.age}`}</p>
      <p>{`Size: ${pet.size}`}</p>      
      <p>{`Status: ${pet.status}`}</p>
      <p>{`Description: ${pet.description}`}</p>
      <a target="_blank" href={pet.url}>Learn More</a>
    </div>
  );
}

export default PetDetails;