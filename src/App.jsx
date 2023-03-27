import { useState, useEffect, createContext } from "react";
import "./App.css";

const petFinderAPI = "https://api.petfinder.com/v2";
const API_KEY = "hMt4PzpbJDOd6ZGhQCZu7vigLytEIKhSjV9OE6HSSjEZcWXN0T";
const API_Secret = "FPJuhpj020BX2QNoFaAz09uyNNLyjAGQng1UrOnF";

function App([Component, pageProps]) {
  const [pets, setPets] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    async function getPets() {
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
      params.append("client_id", API_KEY);
      params.append("client_secret", API_Secret);
      const response = await fetch(petFinderAPI + "/oauth2/token", {
        method: "POST",
        body: params,
      });
      const data = await response.json();
      console.log(data);
      setAccessToken(data.access_token);
    }
    getPets();
  }, []);

  useEffect(() => {
    async function getPets() {
      const response = await fetch(`${petFinderAPI}/animals`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setPets(data.animals);
    }
    getPets();
  }, []);

  return <div className="App"></div>;
}

export default App;
