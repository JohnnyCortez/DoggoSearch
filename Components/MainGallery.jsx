import { useState } from "react";

function MainGallery(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      {props.pets.map((pet) => (
        <div>
          <div key={pet.id}>{pet.name}</div>
          {pet.photos.length > 0 ? (
            <div>
            <img src={pet.photos[0].small} width="100" height="100" />
            <p>{`Gender: ${pet.gender}`}</p>
            <p>{`Age: ${pet.age}`}</p>            
            <p>{`Size: ${pet.size}`}</p>
            <p>{`Coat: ${pet.coat}`}</p>
            </div>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
}

export default MainGallery;
