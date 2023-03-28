import { useState, useEffect } from "react";
import MainGallery from "../Components/MainGallery";
import FilterOptions from "../Components/FilterOptions";
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
  const [shibaInuCount, setShibaInuCount] = useState(0);
  const [filters, setFilters] = useState({ age: "", gender: "", size: "" });


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
      let query = `${petFinderAPI}/animals?type=dog&breed=Shiba%20Inu&limit=100`;
      if (filters.age) {
        query += `&age=${filters.age}`;
      }
      if (filters.gender) {
        query += `&gender=${filters.gender}`;
      }
      if (filters.size) {
        query += `&size=${filters.size}`;
      }
      const response = await fetch(query, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();      
      setPets(data.animals);
      const totalCount = data.pagination.total_count;
      setShibaInuCount(totalCount);
    }
    if (accessToken) {
      getAnimals();
    }
  }, [accessToken]);

  useEffect(() => {
  console.log(pets);
}, [pets]);


function handleFilterChange(event) {
  const name = event.target.name;
  const value = event.target.value;
  setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
}


  return (
    <div className="App">
      <div className="heading">
        <h1>SHIBIE FINDER</h1>
        <h3>Adpot Doge (the yellow dog)</h3>
        <p>Total Shiba Inus: {shibaInuCount}</p>
      </div>
      <FilterOptions filters={filters} handleChange={handleFilterChange}/>

      <div className="body">
      {pets.length > 0 && <MainGallery pets={pets} />}
      </div>
  </div>
  );
}

export default App;