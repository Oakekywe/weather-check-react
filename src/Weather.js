import React, { useState, useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=16.81&longitude=96.16&current_weather=true";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(API_URL);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData || Object.keys(weatherData).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeCircles type="Puff" color="#4F46E5" height={100} width={100} />
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded p-8 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Current Weather in Yangon</h2>
        <p className="text-2xl mb-6">
          Temperature: {weatherData.current_weather.temperature}°C
        </p>
        <p className="text-2xl mb-6">
          <b>
            {weatherData.current_weather.weathercode > 1 ? "Cloudy" : "Sunny"}
          </b>
        </p>
      </div>
    </div>
  );
};

export default Weather;
