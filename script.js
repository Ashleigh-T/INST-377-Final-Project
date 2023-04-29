
/*
    current i have the bare bones done for this for the main page 
    in the un asyc functions i need to work with the json paths to get the data 
*/

function injectDriverNames(driver_rankings){
    for (let i = 0; i <20; i++){
        const spot = document.querySelector('#name'+(i+1));
        //console.log(spot);
        spot.innerHTML = driver_rankings.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName;
        //console.log(driver_rankings.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName);
        //console.log(spot);
    };
};

function injectDriversPoints(driver_rankings){
    for (let i = 0; i <20; i++){
        const spot = document.querySelector('#points'+(i+1));
        //console.log(spot);
        spot.innerHTML = driver_rankings.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points;
        //console.log(driver_rankings.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points);
        //console.log(spot);
    };
};

function injectConstructorRank(r_index){
    for(let index = 0 ; index < 5 ; index++){
        const box = document.querySelector('#CR'+(index+1));
        //console.log(box);
        const spot = box.querySelector('.rank');
        //console.log(spot);
        spot.innerHTML = (r_index);
        r_index++;
        //console.log(spot);
    }
};

function injectConstructorPoints(r_index,constructors_ranking){
    for(let index = 0; index < 5; index++){
        const box = document.querySelector('#CR'+(index+1));
        //console.log(box);
        const spot = box.querySelector('.points');
        //console.log(spot)
        spot.innerHTML = constructors_ranking.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[r_index].points;
        //console.log(constructors_ranking.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[r_index].points);
        r_index++;
    };
};

function injectConstructorLogos(r_index,constructors_ranking,logos){
    for(let index = 0; index < 5; index++){
        const box = document.querySelector('#CR'+(index+1));
        //console.log(box);
        const key = constructors_ranking.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[r_index].Constructor.name;
        //console.log(logos.get(key));
        box.querySelector('img').src = logos.get(key);
        r_index++;
    }
};

function injectFirstRowNRS(race_info,round){
    let spot = document.querySelector('#NRS1 > h4');
    console.log(spot);
        spot.innerHTML = race_info.MRData.RaceTable.Races[round].Circuit.circuitName;
    spot = document.querySelector('#NRS2 > h4');
        spot.innerHTML = race_info.MRData.RaceTable.Races[round].Circuit.Location.country;
    spot = document.querySelector("#NRS3 > h4");
        spot.innerHTML = (race_info.MRData.RaceTable.Races[round].time);
    spot = document.querySelector("#NRS4 > h4");
        spot.innerHTML = round;

}


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
        ['Alfa Romeo','Final_Project/Photos/AlfaRomeo/alfa romeo logo.jpg'],
        ['AlphaTauri','Final_Project/Photos/AlphaTauri/alpha tauri logo.jpg'],
        ['Alpine F1 Team','Final_Project/Photos/Alpine/alpine logo.jpg'],
        ['Aston Martin',"Final_Project/Photos/AstonMartin/Aston-Martin logo.jpg"],
        ['Ferrari','Final_Project/Photos/Ferrari/Ferrari-Logo.jpg'],
        ['Hass F1 Team','Final_Project/Photos/Hass/haas logo.jpg'],
        ['McLaren','Final_Project/Photos/Mclaren/mclaren logo.jpg'],
        ['Mercedes','Final_Project/Photos/Mercedes/mercedes logo.jpg'],
        ['Red Bull','Final_Project/Photos/RedBull/redbull logo.jpg'],
        ['Williams','Final_Project/Photos/Williams/Williams logo.jpg']
    ]);

    

 let results = await fetch('http://ergast.com/api/f1/current/driverStandings.json');
    const driver_rankings = await results.json();
    //console.log(driver_rankings);

 results = await fetch ('http://ergast.com/api/f1/current/constructorStandings.json');
    const constructors_ranking = await results.json();
    //console.log(constructors_ranking);

 const last_round = driver_rankings.MRData.StandingsTable.StandingsLists[0].round;
    //console.log(last_round);

 results = await fetch('http://ergast.com/api/f1/current.json');
    const races = await results.json();
    console.log(races);

    injectDriverNames(driver_rankings);
    injectDriversPoints(driver_rankings);

    injectConstructorRank(1);
    injectConstructorPoints(0,constructors_ranking);
    injectConstructorLogos(0,constructors_ranking,logo_img);

    injectFirstRowNRS(races,last_round);
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());