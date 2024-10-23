const container = document.querySelector(".container");
const search = document.querySelector(".search button");
const weather = document.querySelector(".weather-img");
const temp = document.querySelector(".temp");

search.addEventListener('click', () => {
    const APIKEY = '3c290aa07aef5ebc8160999d3fd274a2';
    const city = document.querySelector('.search input').value;
    const location = document.querySelector(".location");
    const showing = document.querySelector('.hidden');
    const weatherimg = document.querySelector('.weather-img img'); 

    if (city === '') {
        weatherimg.src = 'images/404.png'; 
       
        return;
    }

 
    showing.classList.remove('hide');
    location.textContent = city;

    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
        .then(response => {
        
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(json => {
            const temp = document.querySelector(".temp h1");
            const temp1 = document.querySelector(".temp p");
            const humidity = document.querySelector('.humandity .percent');
            const km = document.querySelector('.humandity .km');

            temp.textContent = `${Math.round(json.main.temp)}°C`;
            temp1.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            km.textContent = `${json.wind.speed} km/h`;

            const iconCode = json.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; 
            weatherimg.src = iconUrl; 

        })
        .catch(error => {
          
            weatherimg.src = 'images/404.png'; 
           
        });
});

