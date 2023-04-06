import { useState, useEffect } from "react";
import Home from "../Components/Home";
import Nav from "../Components/Nav";
import PetDetails from "../Components/PetDetails";
import SummaryGraph from "../Components/SummaryGraph";
import { Route, Routes } from "react-router-dom";

import "./App.css";

//displays current list of fetched pets with information about each
//summary stats- total number of fetched pets, mode of age, mode of coat
//search- through names in the fetched pets
//filter- through age, gender, and weight

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


  // I added pets in the dependency to get new shiba count with each update in search
  useEffect(() => {
    async function getAnimals() {
      let query = `${petFinderAPI}/animals?type=dog&breed=Shiba%20Inu&limit=100`;
      const response = await fetch(query, {
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

  // useEffect(() => {
  //   console.log(pets);
  // }, [pets]);

  return ( 
    <div>
    <Nav pets={pets} />
    <Routes>
        <Route index={true} exact path="/" element={<Home />} />
        <Route index={true} exact path="/Pet/:id" element={<PetDetails />} />
        <Route index={true} exact path="/SummaryGraph" element={<SummaryGraph />} />
    </Routes>
    </div>   
  );
}

export default App;
