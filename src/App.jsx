import { useState, useEffect } from "react";
import MainGallery from "../Components/MainGallery";
import "./App.css";

//displays current list of fetched pets with information about each
//summary stats- total number of fetched pets, most common age, most common coat
//search- through names in the fetched pets
//filter- through breed type, size, and gender

const petFinderAPI = "https://api.petfinder.com/v2";
const API_KEY = "hMt4PzpbJDOd6ZGhQCZu7vigLytEIKhSjV9OE6HSSjEZcWXN0T";
const API_SECRET = "FPJuhpj020BX2QNoFaAz09uyNNLyjAGQng1UrOnF";



function App() {
  const [pets, setPets] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
      params.append("client_id", API_KEY);
      params.append("client_secret", API_SECRET);
      const response = await fetch(petFinderAPI + "/oauth2/token", {
        method: "POST",
        body: params,
      });
      const data = await response.json();
      console.log(data);
      setAccessToken(data.access_token);
    }

    getToken();
  }, []);

  useEffect(() => {
    async function getAnimals() {
      const response = await fetch(`${petFinderAPI}/animals`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();      
      setPets(data.animals);
    }
    if (accessToken) {
      getAnimals();
    }
  }, [accessToken]);

  useEffect(() => {
  console.log(pets);
}, [pets]);

  return (
    <div className="App">
      <MainGallery pets={pets}/>
  </div>
  );
}

export default App;