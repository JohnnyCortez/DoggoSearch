import { useState, useEffect } from "react";
import MainGallery from "../Components/MainGallery";
import FilterOptions from "../Components/FilterOptions";
import SummaryTabs from "../Components/SummaryTab";
import "../src//App.css";

//displays current list of fetched pets with information about each
//summary stats- total number of fetched pets, mode of age, mode of coat
//search- through names in the fetched pets
//filter- through age, gender, and weight

const petFinderAPI = "https://api.petfinder.com/v2";
const API_KEY = "hMt4PzpbJDOd6ZGhQCZu7vigLytEIKhSjV9OE6HSSjEZcWXN0T";
const API_SECRET = "FPJuhpj020BX2QNoFaAz09uyNNLyjAGQng1UrOnF";

function Home() {
  const [pets, setPets] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [shibaInuCount, setShibaInuCount] = useState(0);
  const [filters, setFilters] = useState({ age: "", gender: "", size: "" });
  const [ageMode, setAgeMode] = useState("");
  const [genderMode, setGenderMode] = useState("");
  const [sizeMode, setSizeMode] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");


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
      let query = `${petFinderAPI}/animals?type=dog&breed=Shiba%20Inu&limit=1`;
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
  }, [accessToken, filters.age, filters.size, filters.gender]);

  useEffect(() => {
    console.log(pets);
  }, [pets]);

  function handleFilterChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.log("this works");
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    console.log(filters);
  }

  function getMode(arr) {
    const count = arr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    const maxCount = Math.max(...Object.values(count));
    const mode = Object.keys(count).find((key) => count[key] === maxCount);
    return mode;
  }

  useEffect(() => {
    const ageArray = pets.map((pet) => pet.age);
    const genderArray = pets.map((pet) => pet.gender);
    const sizeArray = pets.map((pet) => pet.size);
    setAgeMode(getMode(ageArray));
    setGenderMode(getMode(genderArray));
    setSizeMode(getMode(sizeArray));
  }, [pets, filters.age, filters.size, filters.gender]);


  const searchItems = (searchValue) => {
    console.log("searchValue:", searchValue);
    console.log("filteredResults", filteredResults)
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = pets.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
      const totalCount = filteredResults.length;
      setShibaInuCount(totalCount);
    } else {
      setFilteredResults(pets);
    }
  };

  useEffect(() => {
    console.log("filteredResults:", filteredResults);
    // const filteredPets = pets.filter(pet =>
    //   pet.name.toLowerCase().includes(searchInput.toLowerCase())
    // );
    setPets(filteredResults);
  }, [filteredResults]);

  return (    
    <div className="App">
      <div className="heading">
        <h1>SHIBIE SEARCH</h1>
        <h2>Adopt Doge (the yellow dog)</h2>
      </div>
      <FilterOptions filters={filters} handleChange={handleFilterChange} />
      <SummaryTabs ageMode={ageMode} sizeMode={sizeMode} genderMode={genderMode} count={shibaInuCount} />

      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />

      <div className="body">
        {(pets.length > 0 && <MainGallery pets={pets} />)}
      </div>
    </div>
  );
}

export default Home;
