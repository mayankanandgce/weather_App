document.addEventListener('DOMContentLoaded', () =>{
   const cityInput = document.getElementById("city-input" );
   const getWeatherBtn = document.getElementById("get-weather-btn" );
   const weatherInfo = document.getElementById("weather-info" );
   const cityNameDsplay = document.getElementById("city-name" );
   const temperatureDsplay = document.getElementById("temperature" );
   const descriptionDisplay = document.getElementById("description" );
   const errorMessage = document.getElementById("error-message" );
   const API_KEY ="1c6a4e9503afbacabb68aa21f41d9dc3";//env variables
    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim()
        if(!city) return;

            try {
                const weatherData = await fetchWeatherData(city)
                displayWeatherData(weatherData);
            } catch (error){
                showError();
            }
    })

    async function fetchWeatherData(city){
        //gets the Data 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log("RESPONSE", response);

        if (!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json()
        return data;
        
    }
    function displayWeatherData(data){
        //display data

        console.log(data);
        const {name, main, weather} = data
        cityNameDsplay.textContent =name;
        //umlock the display
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        temperatureDsplay.textContent = `Temperature :${main.temp}`;
        descriptionDisplay.textContent = `Weather :${weather[0].description}`;
        
        
    }

    function showError(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden')
    }
});