function removebookmark(){
    var name=prompt("The bookmark you would like to delete:");
    console.log(name);

    var tag=document.getElementById(name);

    if(tag){
        tag.parentNode.removeChild(tag);
        localStorage.removeItem(name);
    }
    else{
        alert("Bookmark not found!");
    }

}


function loadBookmarks() {
    //get container where bookmarks will be displayed
    const websitelist = document.getElementById('links');
    
    // Clear existing bookmarks from the container
    websitelist.innerHTML = '';

    // Iterate over localStorage keys and create <a> tags for each bookmark
    for (let i = 0; i < localStorage.length; i++) {
        //get the name(key) and URL (value) of the bookmark from localStorage
        let name = localStorage.key(i);
        let url = localStorage.getItem(name);

        // Check if the key represents a valid URL
        if (isValidUrl(url)) {
            //create a new<a> element for the bookmark
            let site = document.createElement("a");
            site.setAttribute('href', url);
            site.setAttribute('id', name);
            site.textContent = name;//set the text content of the link to the name

            //append the new bookmark <a> element to the container
            websitelist.appendChild(site);
        } else {
            // Optionally, you can remove invalid keys from localStorage
            localStorage.removeItem(name);
        }
    }
}
//every time page loads the existing bookmarks are loaded
window.onload=loadBookmarks;


function addbookmark() {
    let url = window.prompt("Enter the URL of the website:");
    let name = window.prompt("Enter the name of the website:");

    if (!url) {
        alert("Please enter the URL of a website!");
        return;
    }

    site = document.createElement("a");
    site.setAttribute('href', url);
    site.setAttribute('id', name);
    site.textContent = name;

    const websitelist = document.getElementById('links');
    websitelist.appendChild(site);

    // Store the added bookmark in localStorage
    localStorage.setItem(name, url);
}

function loadBookmarks() {
    //get container where bookmarks will be displayed
    const websitelist = document.getElementById('links');
    
    // Iterate over localStorage keys and create <a> tags for each bookmark
    for (let i = 0; i < localStorage.length; i++) {
        //get the name(key) and URL (value) of the bookmark from localStorage
        let name = localStorage.key(i);
        let url = localStorage.getItem(name);

        // Check if the key represents a valid URL
        if (isValidUrl(url)) {
            //create a new<a> element for the bookmark
            let site = document.createElement("a");
            site.setAttribute('href', url);
            site.setAttribute('id', name);
            site.textContent = name;//set the text content of the link to the name

            //append the new bookmark <a> element to the container
            websitelist.appendChild(site);
        } else {
            // Optionally, you can remove invalid keys from localStorage
            localStorage.removeItem(name);
        }
    }
}

// Function to check if a string is a valid URL
function isValidUrl(string) {
    try {
        //attempt to check if a string is a valid URL
        new URL(string);
        //if successful, return true (valid URL)
        return true;
    } catch (_) {
        //if an error occurs (invalid URL), return false
        return false;
    }
}


// Call loadBookmarks when the page loads
window.onload = loadBookmarks;

function getWeather() {
    const apiKey = 'b713d7805843966760720f10e1b2eb88';
    const city = document.getElementById('city').value;
    const container=document.getElementById('weather-container');

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
        container.style.height="600px";
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}

async function randomquote(){
    const apikey="https://api.quotable.io/random";
    const quote=document.getElementById("the_quote");
    const response=await fetch(apikey);
    var data=await response.json();
    console.log(data.content);
    quote.innerHTML=data.content;

}

const inputbox=document.getElementById("input-field");//get access to the input-field
const listContainer=document.getElementById("list-container");//get access to the list-container


function addTask(){

    if(inputbox.value==''){//if input-field is blank then...
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");//create a new element for the to do list
        li.innerHTML = inputbox.value;//get the new task
        listContainer.appendChild(li);//add the new list element to the list
        let span= document.createElement("span");//add the button to remove the specific task
        span.innerHTML="\u00d7";
        li.appendChild(span);
        //access to container
        var listheight=document.getElementById("title_todo");
        //get current height of container
        var currentheight=listheight.offsetHeight;
        var newheight=currentheight+80;
        listheight.style.height=newheight+"px";//set the new height
    }
    inputbox.value='';//remove the task from the input-field
    saveData();//save the data in the browser
}

var listheight=document.getElementById("title_todo");

// Add a click event listener to the listContainer element
listContainer.addEventListener("click", function(e){
    var currentheight=listheight.offsetHeight;//get current height
    var newheight

    //check is the tag name of the target element of the event is LI
    if(e.target.tagName==="LI"){
        //toggle the presence of the "checked" class on the target LI element
        e.target.classList.toggle("checked");
    }
    //if the target element's tag name is SPAN
    else if(e.target.tagName === "SPAN"){
        //remove the parent element of the target SPAN element(which shoule be an LI element)
        e.target.parentElement.remove();
        newheight=currentheight-80;
        listheight.style.height=newheight+"px";

    }
},false);


function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("height",listheight.offsetHeight);
    showTask();
}

function showTask(){
    listContainer.innerHTML=localStorage.getItem("data");
    listheight.style.height=localStorage.getItem("height")+"px";
}

window.onload=showTask;