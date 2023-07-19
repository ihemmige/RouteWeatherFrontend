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
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorMessage, setErrorMessage] = useState([{}]);

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
      "https://routeweatherapi.azurewebsites.net/forecast?origin={0}&destination={1}",
      origin,
      destination
    );

    setErrorDisplay(false);
    setErrorMessage([{}]);
    axios
      .get(url)
      .then(function (response) {
        setLocations(response.data);
        setDisplaying(true);
        setFetching(false);
        reset();
      })
      .catch(function (error) {
        try {
          setErrorMessage(error.response.data["result"]);
        } catch (anotherError) {
          setErrorMessage("Unknown error. Please try again.");
        }
        setFetching(false);
        setErrorDisplay(true);
      });
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
              class="first-box"
              {...register("origin", { required: true })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Destination"
              name="dest"
              class="text-box"
              {...register("destination", { required: true })}
            />
          </div>
          <input class="text-box" type="submit" />
        </form>
      }

      {fetching && <p>Building route and weather data...</p>}

      {errorDisplay && <p> {errorMessage} </p>}

      {displaying &&
        !fetching &&
        !errorDisplay &&
        locations.result.map((city, i) => (
          <div class="container">
            <img class="weather-icon" src={city["image_code"]}></img>
            <p key={i}>
              {city["city"]}, {city["zip_code"]} - {city["weather"]}
            </p>
            <img class="weather-icon" src={city["image_code"]}></img>
          </div>
        ))}
        
      {!displaying && !fetching && !errorDisplay && (
        <div class="container">
        <p class="open-directions">Provide an origin and destination to get weather along the route.</p>
        </div>
      )}
    </div>
  );
}

export default App;