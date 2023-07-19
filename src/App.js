import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { useForm } from "react-hook-form";
import { format } from "react-string-format";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [locations, setLocations] = useState([{}]);
  const [displaying, setDisplaying] = useState(false);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    setDisplaying(false);
    setFetching(false);
    setLocations([{}]);
  }, []);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setFetching(true);
    getRouteWeather(data.origin, data.destination);
  };

  const getRouteWeather = async (origin, destination) => {
    let url = format(
      "https://route-weather-app.onrender.com/?origin={0}&destination={1}",
      origin,
      destination
    );
    // todo - handle errors from get request
    const response = await axios.get(url);
    setLocations(response.data);
    setDisplaying(true);
    setFetching(false);
    reset();
  };

  return (
    <div className="App">
      {
        <form class="form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Origin"
              name="origin"
              class="text-box"
              {...register("origin", { required: true })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Destination"
              name="dest"
              class = "text-box"
              {...register("destination", { required: true })}
            />
          </div>
          
          <input class="submit" type="submit"/>
          
        </form>
      }
      

      {fetching && <p>Building route and weather data...</p>}

      {displaying && !fetching &&
        locations.result.map((city, i) => (
          <div>
            <p className="App-Link" key={i}>
              {i + 1}. {city["city"]}, {city["zip_code"]}: {city["weather"]}
            </p>
            {/* <p className="App-Link" key={2 * i + 1}>
              
            </p> */}
          </div>
        ))}

      {!displaying && !fetching && (
        <p>Provide an  and destination to get weather along the route.</p>
      )}
    </div>
    
  );
}

export default App;