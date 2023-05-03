
/*
    current i have the bare bones done for this for the main page 
    in the un asyc functions i need to work with the json paths to get the data 
*/

// ALL FUNCTIONS FOR FIRST PAGE 

// all functions for driver rankings
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

// all functions for constructors rankings 
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

// Need to create the button functions !!!

// all functions for next race info
function injectFirstRowNRS(race_info,round){
    let spot = document.querySelector('#NRS1 > h4');
    //console.log(spot);
        spot.innerHTML = race_info.MRData.RaceTable.Races[round].Circuit.circuitName;
    spot = document.querySelector('#NRS2 > h4');
        spot.innerHTML = race_info.MRData.RaceTable.Races[round].Circuit.Location.country;
    spot = document.querySelector("#NRS3 > h4");
        spot.innerHTML = (race_info.MRData.RaceTable.Races[round].time);
    spot = document.querySelector("#NRS4 > h4");
        spot.innerHTML = round;

};

function injectLastRowNRS(next_race_info,qualifying,fastest_lap){
    let spot = document.querySelector('#NRS5 > h4');
        spot.innerHTML = qualifying.MRData.RaceTable.Races[0].QualifyingResults[0].Driver.familyName;
    spot = document.querySelector('#NRS6 > h4');
        spot.innerHTML = next_race_info.MRData.RaceTable.Races[0].Results[0].Driver.familyName;
    spot = document.querySelector('#NRS7 > h4');
        spot.innerHTML = fastest_lap.MRData.RaceTable.Races[0].Results[0].Driver.familyName;
    spot = document.querySelector('#NRS8 > h4')
        spot.innerHTML = fastest_lap.MRData.RaceTable.Races[0].Results[0].FastestLap.Time.time;
};


// ALL FUCNTIONS FOR DRIVERS PAGE 
function injectDriverNameAndPhoto(name,photo){
    let spot = document.querySelector('#driver_name');
    console.log(spot);
    spot.innerText = name;
    spot = document.querySelector('.photo');
    spot.querySelector('img').src = photo;
}

async function mainEvent(){

// Header Functionality -- dynamic page loading 
const driver_page = document.querySelectorAll('.driver_button');
const team_page = document.querySelectorAll('.team_button');
const drivers = new Map([
    ['Max Verstappen', 'max_verstappen'],
    ['Sergio Perez', 'perez'],
    ['Fernando Alonso', 'alonso'],
    ['Lewis Hamilton', 'hamilton'],
    ['Carlos Sainz','sainz'],
    ['Charles Leclerc','leclerc'],
    ['George Russell','russell'],
    ['Lance Stroll','stroll'],
    ['Lando Norris','norris'],
    ['Nico Hulkenberg','hulkenberg'],
    ['Oscar Piastri', 'piastri'],
    ['Valtteri Bottas','bottas'],
    ['Esteban Ocon','ocon'],
    ['Pierre Gasly','gasly'],
    ['Zhou Guanyu','zhou'],
    ['Yuki Tsunoda','tsunoda'],
    ['Alex Albon','albon'],
    ['Kevin Magnussen','kevin_magnussen'],
    ['Logan Sargeant','sargeant'],
    ['Nyck De Vries','de_vries']
]);

const driver_team = new Map([
    [['Max Verstappen', 'RedBull'],
    ['Sergio Perez', 'RedBull'],
    ['Fernando Alonso', 'AstonMartin'],
    ['Lewis Hamilton', 'Mercedes'],
    ['Carlos Sainz','Ferrari'],
    ['Charles Leclerc','Ferrari'],
    ['George Russell','Mercedes'],
    ['Lance Stroll','AstonMartin'],
    ['Lando Norris','McLaren'],
    ['Nico Hulkenberg','Haas'],
    ['Oscar Piastri', 'McLaren'],
    ['Valtteri Bottas','AlfaRomeo'],
    ['Esteban Ocon','Alpine'],
    ['Pierre Gasly','Alpine'],
    ['Zhou Guanyu','AlfaRomeo'],
    ['Yuki Tsunoda','AlphaTauri'],
    ['Alex Albon','Williams'],
    ['Kevin Magnussen','Haas'],
    ['Logan Sargeant','Williams'],
    ['Nyck De Vries','AlphaTauri']]
]);

driver_page.forEach( item => {
    item.addEventListener('click', (event) => {
        console.log(item.innerHTML);
        const key1 = drivers.get(item.innerHTML);
        console.log(key1);
        const key2 = driver_team.get(item.innerHTMl);
        console.log(key2);
        injectDriverNameAndPhoto(item.innerHTML,'Photos/'+ key2 +'/'+ key1 +'.jpg');

        //let data = await fetch();
            //driver_data = await data.json(); 
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
    console.log(driver_rankings);

 results = await fetch ('http://ergast.com/api/f1/current/constructorStandings.json');
    const constructors_ranking = await results.json();
    //console.log(constructors_ranking);

 const last_round = driver_rankings.MRData.StandingsTable.StandingsLists[0].round;
    //console.log(last_round);

 results = await fetch('http://ergast.com/api/f1/current.json');
    const races = await results.json();
    //console.log(races);

    const next_race = races.MRData.RaceTable.Races[last_round].Circuit.circuitId;
    

    let address = 'https://ergast.com/api/f1/2022/circuits/'+next_race+'/results.json';
    console.log(address);

 results = await fetch(address);
    const next_race_info = await results.json();
    console.log(next_race_info);

    address = 'https://ergast.com/api/f1/2022/circuits/'+next_race+'/qualifying/1.json';

 results = await fetch(address);
    const qualifying = await results.json();
    console.log(qualifying);

    address = 'https://ergast.com/api/f1/2022/circuits/'+next_race+'/fastest/1/results.json';

 results = await fetch(address);
    const fastest_lap = await results.json();
    console.log(fastest_lap);


    injectDriverNames(driver_rankings);
    injectDriversPoints(driver_rankings);

    injectConstructorRank(1);
    injectConstructorPoints(0,constructors_ranking);
    injectConstructorLogos(0,constructors_ranking,logo_img);

    injectFirstRowNRS(races,last_round);
    injectLastRowNRS(next_race_info,qualifying,fastest_lap);
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());