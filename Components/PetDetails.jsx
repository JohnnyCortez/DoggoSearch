import React from "react";
import { useParams } from "react-router-dom";

function PetDetails(props) {
    const { id } = useParams();
    

    const findPetById = (id) => {
        return pets.find((pet) => pet.id === id);
      }
    
    const pet = findPetById(id)

  return (
    <div>
      <h2>{pet.name}</h2>
      <img src={pet.photos[0].large} alt={pet.name} />
      <p>{`Gender: ${pet.gender}`}</p>
      <p>{`Age: ${pet.age}`}</p>
      <p>{`Size: ${pet.size}`}</p>
      <p>{`Description: ${pet.description}`}</p>
    </div>
  );
}

export default PetDetails;