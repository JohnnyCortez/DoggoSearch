import { useState } from "react";

function MainGallery(props) {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {props.pets.map((pet) => (
        <div>
          <div key={pet.id}>{pet.name}</div>
          {pet.photos.length > 0 ? (
            <img src={pet.photos[0].small} width="100" height="100" />
          ) : (
            <h7>no image</h7>
          )}
        </div>
      ))}
    </div>
  );
}

export default MainGallery;
