const api_key = "c09602f56e4aaad366cba93f53885690"; 



async function getData(){

    let city = document.getElementById('city').value;

    // let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api_key;

     let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

   // let url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

    
let res = await fetch(url);

let data = await res.json();
 append(data);
 
console.log(data);
}


function append(data){

    let cont = document.getElementById("cont");
    cont.innerHTML= null;

    const  kelvin =273;

    const { sunrise, sunset } = data.sys;
  
  let h3 = document.createElement("h3");
  h3.innerText = data.name;

  let p = document.createElement("p");
  p.innerText = `Current temp: ${Math.floor(data.main.temp-kelvin)}°C 🌡`;

  let p2 = document.createElement("p");
  p2.innerText = `Max temp: ${Math.floor(data.main.temp_max-kelvin)}°C 🌡`;

  let p3 = document.createElement("p");
  p3.innerText = `Min temp: ${Math.floor(data.main.temp_min-kelvin)}°C 🌡`;

  let p4 = document.createElement("p");
  p4.innerText = `Wind speed: ${data.wind.speed} km/h 🍃`;

  let p5 = document.createElement("p");
  p5.innerText = `Clouds: ${data.clouds.all}☁️☁️ `;

 
  const sunriseGMT = new Date(sunrise * 1000);
  const sunsetGMT = new Date(sunset * 1000);


  let p8 = document.createElement("p");
  p8.innerText = `Sunrise:- ${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}🌅`;;

  let p7 = document.createElement("p");
  p7.innerText = `Sunset:-${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()} 🌇`;;

  
  

cont.append(h3,p,p2,p3,p4,p5,p8,p7);

let iframe = document.getElementById("gmap_canvas");
iframe.src = `https://maps.google.com/maps?q=${data.name}&t=k&z=9&ie=UTF8&iwloc=&output=embed`;

let first = document.getElementsByClassName("gmap_canvas").append(iframe);
document.getElementsByClassName("mapouter").append(first);

}


function infoData() 
{

    var city = document.getElementById("city").value;

    let api_key = "c09602f56e4aaad366cba93f53885690";

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`)
    .then(response => response.json())
    .then(data => 
        
        {
    
    for(i = 0; i<7; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
      
    }

    for(i = 0; i<7; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
    }
   

   
     for(i = 0; i<7; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
   
   
    console.log(data)


})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}


var date = new Date();
var weekday = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday","Thursday"];

function dayFunc(day){
    if(day + date.getDay() > 6){
        return day + date.getDay() - 7;
    }
    else{
        return day + date.getDay();
    }
}

    for(i = 0; i<7; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[dayFunc(i)];
    }