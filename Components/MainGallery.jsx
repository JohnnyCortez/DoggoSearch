import { useState } from "react";
import { Link } from "react-router-dom";


function MainGallery(props) {
  return (
    <div>
      {props.pets.map((pet) => (
        <div className="pet">
          <div key={pet.id}>
          <Link to={`/Pet/${pet.id}`} state={{pet: pet}}>
            <h3>{pet.name}</h3>
          </Link>
          </div>
          {pet.photos.length > 0 ? (
            <div>
              <img src={pet.photos[0].small} width="150" height="150" />
              <p>{`Gender: ${pet.gender}`}</p>
              <p>{`Age: ${pet.age}`}</p>
              <p>{`Size: ${pet.size}`}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}

export default MainGallery;
