import React, { useState } from "react";
import axios from "axios";

const WeatherApi = () => {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!cityName.trim()) {
      setError("Please enter a city name!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );
      setWeather(data);
    } catch (error) {
      console.log("City not found or server issue");
      setWeather(null);
      setError("City not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start pt-20 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Enter city..."
        className="text-white w-64 h-12 px-4 border border-gray-300 rounded-md text-black"
      />
      <button
        onClick={fetchWeather}
        className="mt-4 px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Get Weather"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {weather && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="m-5 text-xl font-semibold">City - {weather.name}</h2>
          <p className="m-5 text-xl font-semibold">Country - {weather.sys.country}</p>
          <p className="m-5 text-xl font-semibold">Temp - {weather.main.temp}°C</p>
          <p className="m-5 text-xl font-semibold">Weather - {weather.weather[0].description}</p>
          <p className="m-5 text-xl font-semibold"> Humidity - {weather.main.humidity}</p>


        </div>
      )}
    </div>
  );
};

export default WeatherApi;
