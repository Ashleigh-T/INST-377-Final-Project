
/*
    current i have the bare bones done for this for the main page 
    in the un asyc functions i need to work with the json paths to get the data 
*/

function injectDriverNames(driver_rankings){
    for (let i = 0; i <20; i++){
        const spot = document.querySelector('#name'+(i+1));
        console.log(spot);
        spot.innerHTML = driver_rankings.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName;
        console.log(driver_rankings.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName);
        console.log(spot);
    };
};


async function mainEvent(){

// Header Functionality -- dynamic page loading 
const driver_page = document.querySelectorAll('.driver_button');
const team_page = document.querySelectorAll('.team_button');

driver_page.forEach( item => {
    item.addEventListener('click', (event) => {
        console.log(item.innerHTML);
        // inner HTML is driver name we can use this as param of function to 
        // populate driver page correctly on load 
    }); 
});

team_page.forEach( item => {
    item.addEventListener('click',(event) => {
        console.log(item.innerHTML);
        // inner HTML is team name we can use this as param of function to 
        // populate team page correctly on load 
    });
});








// this is all for the main page so far 
// below are the varibles that need to be global for everything to work 
 const left_button = document.querySelector("#left_button");
 const right_button = document.querySelector('#right_button');
 const logo_img = new Map([
        ['AlfaRomeo','Photos/AlfaRomeo/alfa romeo logo.jpg'],
        ['AlphaTauri','Photos/AlphaTauri/alpha tauri logo.jpg'],
        ['Alpine','Photos/Alpine/alpine logo.jpg'],
        ['AstonMartin',"Photos/AstonMartin/Aston-Martin logo.jpg"],
        ['Ferrari','Photos/Ferrari/Ferrari-Logo.jpg'],
        ['Hass','Photos/Hass/haas logo.jpg'],
        ['Mclaren','Photos/Mclaren/mclaren logo.jpg'],
        ['Mercedes','Photos/Mercedes/mercedes logo.jpg'],
        ['RedBull','Photos/RedBull/redbull logo.jpg'],
        ['Williams','Photos/Williams/Williams logo.jpg']
    ]);

    

 let results = await fetch('http://ergast.com/api/f1/current/driverStandings.json');
    const driver_rankings = await results.json();
    console.log(driver_rankings);

 results = await fetch ('http://ergast.com/api/f1/current/constructorStandings.json');
    const constructors_ranking = await results.json();
    console.log(constructors_ranking);

 results = await fetch('http://ergast.com/api/f1/current/last/results.json');
    const last_race_results = await results.json();
    console.log(last_race_results);

    injectDriverNames(driver_rankings);

}

document.addEventListener("DOMContentLoaded", async () => mainEvent());