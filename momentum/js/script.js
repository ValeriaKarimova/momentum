import playList from './playlist.js';
import lang from './lang.js';

let choosenLang = localStorage.getItem('lang') || 'en'; 

i18next.init({
    lng: choosenLang,
    debug: true,
    resources: lang,
  });

  


const time = document.querySelector('.time');
const currentDate = document.querySelector('.date');
const body = document.querySelector('body');
const nextSlide = document.querySelector('.slide-next');
const prevSlide = document.querySelector('.slide-prev');
const greeting = document.querySelector('.greeting');
const greetingSection = document.querySelector('.greeting-container')
const userName = document.querySelector('.name');
const weather = document.querySelector('.weather')
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description'); 
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const quoteSection = document.querySelector('.quotes');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const audio = document.querySelector('audio');
const player = document.querySelector('.player');
const play = document.querySelector('.play');
const prevSong = document.querySelector('.play-prev');
const nextSong = document.querySelector('.play-next');
const songList = document.querySelector('.play-list');
const language = document.querySelector('.change-lang');
const settings = document.querySelector('.settings-btn');
const settingsMenu = document.querySelector('.settings');
const hideTime = document.getElementById('hide-time');
const hideDate = document.getElementById('hide-date');
const hideGreeting = document.getElementById('hide-greeting');
const hideAudio = document.getElementById('hide-audio');
const hideWeather = document.getElementById('hide-weather');
const hideQuote = document.getElementById('hide-quote');
const bgSourceSelector = document.querySelector('.change-bg');
const localizableList = document.querySelectorAll('.i_can_localize');
const twinkleList = document.querySelectorAll('.twinkle');




let isPlay = false;
let randomNumber;
let partOfDay = defineTimeOfDay();
let songNumber = 0;

for(let i = 0; i < playList.length; i++){
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = `${playList[i].title}`;
    songList.append(li);
}
let songs = document.querySelectorAll('.play-item');

function onLocalizationChanged() {
    
    city.placeholder = `${i18next.t("city")}`
    
    if (city.value == "Minsk" || city.value == "Минск") {
        city.value = `${i18next.t("city")}`
    }
    greeting.textContent = `${i18next.t(partOfDay)},`;
    userName.value = i18next.t("placeholderKey");

    for (let item of localizableList){
        item.textContent = i18next.t(item.dataset.localizeKey)
        
    }

    getWeather();
}






nextSlide.addEventListener('click', getSlideNext);
prevSlide.addEventListener('click', getSlidePrev);
window.addEventListener('beforeunload', saveLocalStorage);
window.addEventListener('load', getLocalStorage);
city.addEventListener('change', getWeather);
changeQuote.addEventListener('click', getQuotes);
play.addEventListener('click', playAudio);
prevSong.addEventListener('click', playPrev);
nextSong.addEventListener('click', playNext);
language.addEventListener('change', changeLocalization);
settings.addEventListener('click', hideSetting);
bgSourceSelector.addEventListener('change', changeBgSource);


for (let twinkle of twinkleList) {

    let isChecked = localStorage.getItem(twinkle.name) == "true";
    twinkle.checked = isChecked;

    let selector = '.' + twinkle.dataset.visibility;
    let element = document.querySelector(selector)

    if (twinkle.checked) {
        element.classList.add('hide-section');
    } else {
        element.classList.remove('hide-section');
    }

    twinkle.addEventListener('change', () => {
        localStorage.setItem(twinkle.name, twinkle.checked)
        if (twinkle.checked) {
            element.classList.add('hide-section');
        } else {
            element.classList.remove('hide-section');
        }
    })
    
}


let bgSourceMode = localStorage.getItem('bgSourceMode') || "git";  // git unsplash flickr
let option = bgSourceSelector.querySelector(`option[value='${bgSourceMode}']`)
option.selected = true;
option = language.querySelector(`option[value='${choosenLang}']`);
option.selected = true;


function changeBgSource(){
    bgSourceMode = bgSourceSelector.value;
    localStorage.setItem('bgSourceMode', bgSourceMode);
    changeBackground();
}


function changeLocalization(){
    localStorage.setItem("lang", language.value);
    i18next.changeLanguage(language.value).then(() => {
        onLocalizationChanged()
    })
}

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
}

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const today = date.toLocaleDateString(`${i18next.t("us")}`, options);
    currentDate.textContent = today;
}

function getRandomNumber (min, max) {
    randomNumber = Math.floor(Math.random() * (max - min) + min);
}

function getGitImageUrl(){
    let newNumber = String(randomNumber).padStart(2, 0);
    let partOfDay = defineTimeOfDay();
    let newBg = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${partOfDay}/${newNumber}.jpg`;

    return newBg;
}

function setBackground(newBg) {
    const img = new Image();
    img.src = newBg;
    img.onload = () => {      
        body.style.backgroundImage = `url('${newBg}')`;
    }; 
}

function defineTimeOfDay() {
    const date = new Date();
    let hours = date.getHours();
    let timeOfDay = "";
    if (hours >= 6 && hours < 12) {
        timeOfDay = 'morning';
    } else if (hours >= 12 && hours < 18) {
        timeOfDay = 'afternoon';
    } else if (hours >= 18) {
        timeOfDay = 'evening';
    } else if (hours >= 0  && hours < 6) {
        timeOfDay = 'night';
    }
    return timeOfDay;
}

function getSlideNext() {
    randomNumber++;
    if (randomNumber > 20){
        randomNumber = 1;
    }
    changeBackground();
}

function getSlidePrev() {
    randomNumber--;
    if (randomNumber < 1) {
        randomNumber = 20;
    }
    changeBackground();
    
}

function saveLocalStorage() {
    localStorage.setItem('name', userName.value);
    localStorage.setItem('city', city.value);
  }

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
        userName.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
  }

async function getWeather() {  

    if (city.value == ""){
        alert("city is empty");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${i18next.language}&appid=c742e9e2d55e34c546657c49543b46c2&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod == 404) {
        alert(data.message);
        return;
    }
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${i18next.t("wind")}: ${Math.round(data.wind.speed)} ${i18next.t("ms")}`;
    humidity.textContent = `${i18next.t("humidity")}: ${Math.round(data.main.humidity)}%`;
  }

async function getQuotes() {  
    const quotes = 'https://type.fit/api/quotes';
    const res = await fetch(quotes);
    const data = await res.json();
    const randomQuote = Math.floor(Math.random() * data.length); 
    quote.textContent = `${data[randomQuote].text}`;
    author.textContent = `${data[randomQuote].author}`
  }


function playAudio() {
    if (!isPlay) {
        audio.src = playList[songNumber].src;
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
        play.classList.add('pause');

        for (let i = 0; i < songs.length; i++) {
            if (i == songNumber) {
                songs[i].classList.add('active');
            } else {
                songs[i].classList.remove('active');
            }
        }
    } else {
        audio.pause();
        isPlay = false;
        play.classList.remove('pause');
    }
  }

function playNext() {
    songNumber++;
    if (songNumber > 3) {
        songNumber = 0;
    }
    if (isPlay){
        playAudio();
    }

    playAudio();
    
}

function playPrev() {
    songNumber--;
    if (songNumber < 1) {
        songNumber = 3;
    }
    if (isPlay){
        playAudio();
    }

    playAudio();
}

function hideSetting() {
    settingsMenu.classList.toggle('visible-menu');
}

async function getLinkToImage() {
    const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=2Ot3LMQhWKxZ66f__-smnA2t8CBJ_mqinx-T5RklR3s';
    
    return fetch(url)
      .then(res => res.json())
      .then(data => data.urls.regular);
}

async function getLinkToFlickr() {
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=732f07db4225b051bf3537e27716bb8b&tags=nature&extras=url_l&format=json&nojsoncallback=1';
    
    return fetch(url)
      .then(res => res.json());
}

let flickrData = null;

async function whenFlickrDataIsReady() {
    if (flickrData == null) {
        return getLinkToFlickr()
            .then(data => flickrData = data);
    } else {
        return Promise.resolve(flickrData);
    }
}

function getRandomFlickrUrl(data) {
    let photo = data.photos.photo[Math.floor(Math.random() * data.photos.photo.length)];
    let result =  `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;

    return result;
}

function changeBackground() {

    switch (bgSourceMode) {
        case "git" : {
            let url = getGitImageUrl();
            setBackground(url);

            break;
        }
        case "unsplash" : {
            getLinkToImage()
                .then(url => setBackground(url));

            break;
        }
        case "flickr" : {
            whenFlickrDataIsReady()
                .then(data => getRandomFlickrUrl(data))
                .then(url => setBackground(url));

            break;
        }
    }

}


onLocalizationChanged();
getWeather();
getQuotes();
showTime();
getRandomNumber(1, 21);
changeBackground();