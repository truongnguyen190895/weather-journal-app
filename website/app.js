/* Global Variables */
const API_KEY = "701bf14e162834f0ae36da5726d7a029&units=imperial";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const DOMAIN = window.location.origin;

const generateBtn = document.querySelector("#generate");
const input = document.querySelector("#zip");
const textArea = document.querySelector("#feelings");
const entryDate = document.querySelector("#date");
const entryTemp = document.querySelector("#temp");
const entryContent = document.querySelector("#content");

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const fetchWeatherData = async (baseUrl, zip, key) => {
  const fetchURL = `${baseUrl}?zip=${zip}&appid=${key}`;
  try {
    const response = await fetch(fetchURL);
    const weatherData = await response.json();
    const payload = {
      response: textArea.value,
      temperature: weatherData.main.temp,
      date: newDate,
    };
    sendToServer(payload);
    fetchFromServer();
  } catch (error) {
    window.alert("Ooops, something wrong!");
  }
};

const sendToServer = async (payload) => {
  try {
    await fetch("/update-weather", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Can not send ", error);
  }
};

const fetchFromServer = async () => {
  try {
    const response = await fetch("/weather");
    const data = await response.json();
    if (data) {
      entryDate.innerHTML = data.date;
      entryTemp.innerHTML = data.temperature;
      entryContent.innerHTML = data.response;
    }
  } catch (error) {
    console.error("Can not get ", error);
  }
};

generateBtn.addEventListener("click", () => {
  fetchWeatherData(BASE_URL, input.value, API_KEY);
});
