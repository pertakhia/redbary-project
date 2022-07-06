//Variables
const redberry_knight_cup_landing = document.querySelector(".frame");
const rectangle1 = document.querySelector(".right-container");
const rectangle2 = document.querySelector(".header-container");
const rectangle3 = document.querySelector(".footer-container");
const landing_page_scrolling_photo = document.querySelector(".left-container");


let url = "https://chess-tournament-api.devtest.ge/api/grandmasters";

async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}

fetchAsync(url);

