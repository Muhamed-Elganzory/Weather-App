
/**
 * 
 * 🛜 Details For API.
 *      Base URL: http://api.weatherapi.com/v1
 *      API Key: b3b2724f56a941fbbb8125712241012
 *      https://api.weatherapi.com/v1/forecast.json?key=b3b2724f56a941fbbb8125712241012&q=cairo&days=2
 */


/**
 * 
 * 📕Elements to manipulate.
 */
let DOMElements = {
    findInput: document.getElementById('findInput'),
    btnFind: document.getElementById('btnFind'),

    // =====> Current ( First Day )
    countryName: document.getElementById('countryName'),
    temp_Max1: document.getElementById('temp_C1'),
    imageStatusDay1: document.getElementById('imageStatusDay1'),
    statusWeather1: document.getElementById('statusWeather1'),
    tz_location: document.getElementById('tz_location'),
    firstDay: document.getElementById('firstDay'),
    monthText: document.getElementById('monthText'),
    monthNumber: document.getElementById('monthNumber'),

    // =====> Second Day
    temp_Max2: document.getElementById('temp_C2'),
    imageStatusDay2: document.getElementById('imageStatusDay2'),
    temp_Min2: document.getElementById('temp_Min2'),
    statusWeather2: document.getElementById('statusWeather2'),
    secondDay: document.getElementById('secondDay'),

    // =====> Third Day
    imageStatusDay3: document.getElementById('imageStatusDay3'),
    temp_C3: document.getElementById('temp_C3'),
    temp_Min3: document.getElementById('temp_Min3'),
    statusWeather3: document.getElementById('statusWeather3'),
    thirdDay: document.getElementById('thirdDay'),
}

/**
 * 
 * 🎒That Object to store data to display it.
 */
let objOfCountries = {};

/**
 * 
 * ✊ Catch value from input of find.
 *  ||
 * ✊ Fetch value from input of find, if user clicked on find button.
 */
function listenerOfFind() {
    /**
     * 
     * Input.
     */
    DOMElements.findInput.addEventListener('input', function (e) {
        getData(e.target.value);
    });

    /**
     * 
     * Find Button.
     */
    DOMElements.btnFind.addEventListener('click', function () {
        getData(DOMElements.findInput.value);
        clearData();
    });
}

/**
 * 
 * 📝 Get data from API.
 */
function getData(queryParameter = 'cairo') {
    let xml = new XMLHttpRequest();
    xml.open('GET', `https://api.weatherapi.com/v1/forecast.json?key=b3b2724f56a941fbbb8125712241012&q=${queryParameter}&days=3`);
    xml.send();
    xml.addEventListener('readystatechange', function () {
        if (xml.readyState === 4) {
            objOfCountries = JSON.parse(xml.response);
            display();
        }
    });
}

/**
 * 
 *  📅 That Function To Fetch Date From API, and Convert It To Text ( Day ).
 * @param {*} dateParam 
 * @returns 
 */
function getDay(dateParam) {
    let date = new Date(dateParam);
    let numOfDay = date.getDay();
    let arrWeekDay = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return arrWeekDay[numOfDay + 1];
}

/**
 * 
 *  📅 That Function To Fetch Date From API, and Convert It To Text ( Month ).
 * @param {*} dateParam 
 * @returns 
 */
function getMonth_Text(dateParam) {
    let date = new Date(dateParam);
    let numOfMonth = date.getMonth();
    let arrMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return arrMonths[numOfMonth];
}

/**
 * 
 *  📅 That Function To Fetch Date From API, and Convert It To Text ( Number Of Month ).
 * @param {*} dateParam 
 * @returns 
 */
function getMonth_Number(dateParam) {
    let date = new Date(dateParam);
    let numOfMonth = date.getMonth();
    return numOfMonth;
}

/**
 * 
 * 🌞 Display Weather For 3 Days.
 */
function display() {
    // current First Day
    DOMElements.countryName.innerText = objOfCountries.location.country; // Egypt
    DOMElements.temp_Max1.innerText = objOfCountries.current.temp_c; // 21.3°C
    DOMElements.imageStatusDay1.setAttribute('src', `${objOfCountries.current.condition.icon}`); // icon
    DOMElements.statusWeather1.innerText = objOfCountries.current.condition.text; // Clear
    DOMElements.tz_location.innerText = objOfCountries.location.tz_id; // Africa/Cairo
    DOMElements.firstDay.innerText = getDay(objOfCountries.forecast.forecastday[0].date); // Wednesday
    DOMElements.monthNumber.innerText = getMonth_Number(objOfCountries.forecast.forecastday[0].date); // 11
    DOMElements.monthText.innerText = getMonth_Text(objOfCountries.forecast.forecastday[0].date); // December

    // forecast the second day
    DOMElements.imageStatusDay2.setAttribute('src', `${objOfCountries.forecast.forecastday[1].day.condition.icon}`);
    DOMElements.temp_Max2.innerText = objOfCountries.forecast.forecastday[1].day.maxtemp_c;
    DOMElements.temp_Min2.innerText = objOfCountries.forecast.forecastday[1].day.mintemp_c;
    DOMElements.statusWeather2.innerText = objOfCountries.forecast.forecastday[1].day.condition.text;
    DOMElements.secondDay.innerText = getDay(objOfCountries.forecast.forecastday[1].date);

    // forecast the third day
    DOMElements.imageStatusDay3.setAttribute('src', `${objOfCountries.forecast.forecastday[2].day.condition.icon}`);
    DOMElements.temp_C3.innerText = objOfCountries.forecast.forecastday[2].day.maxtemp_c;
    DOMElements.temp_Min3.innerText = objOfCountries.forecast.forecastday[2].day.mintemp_c;
    DOMElements.statusWeather3.innerText = objOfCountries.forecast.forecastday[2].day.condition.text;
    DOMElements.thirdDay.innerText = getDay(objOfCountries.forecast.forecastday[2].date);
}

/**
 * 
 * 🆑 Clear Input After User Pressed Find Button.
 */
function clearData() {
    DOMElements.findInput.value = '';
}

/**
 * 
 * 🚨 Once the Page run, Will That Function is Executed.
 */
(function () {
    getData();
})();

/**
 * 
 * 🎯 The User Once Entered Inputs or Pressed The Find Button, That Function Will Call.
 */
listenerOfFind();
