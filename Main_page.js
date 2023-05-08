

// ALL FUNCTIONS FOR MAIN PAGE

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


async function mainEvent(){
 
    // header functionality 
    const driver_page = document.querySelectorAll('.driver_button');
    const team_page = document.querySelectorAll('.team_button');

    driver_page.forEach( item => {
        item.addEventListener('click', (event) => {
            //console.log(item.innerHTML);
            localStorage.clear;
            localStorage.setItem('Driver',item.innerHTML);
        }); 
    });

    team_page.forEach( item => {
        item.addEventListener('click',(event) => {
            //console.log(item.innerHTML);
            localStorage.setItem('Team',item.innerHTML)
        });
    });

 // page functionality 
 const left_button = document.querySelector("#left_button");
 const right_button = document.querySelector('#right_button');
 const logo_img = new Map([
        ['Alfa Romeo','Final_Project/Photos/AlfaRomeo/logo.jpg'],
        ['AlphaTauri','Final_Project/Photos/AlphaTauri/logo.jpg'],
        ['Alpine F1 Team','Final_Project/Photos/Alpine/logo.jpg'],
        ['Aston Martin',"Final_Project/Photos/AstonMartin/logo.jpg"],
        ['Ferrari','Final_Project/Photos/Ferrari/logo.jpg'],
        ['Hass F1 Team','Final_Project/Photos/Hass/logo.jpg'],
        ['McLaren','Final_Project/Photos/Mclaren/logo.jpg'],
        ['Mercedes','Final_Project/Photos/Mercedes/logo.jpg'],
        ['Red Bull','Final_Project/Photos/RedBull/logo.jpg'],
        ['Williams','Final_Project/Photos/Williams/logo.jpg']
    ]);
 

    
// API CALLS BELOW 

// Driver call
 let results = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
    const driver_rankings = await results.json();
    //console.log(driver_rankings);

// Constructor call
 results = await fetch ('https://ergast.com/api/f1/current/constructorStandings.json');
    const constructors_ranking = await results.json();
    //console.log(constructors_ranking);

// Find last round 
 const last_round = driver_rankings.MRData.StandingsTable.StandingsLists[0].round;
    //console.log(last_round);

// current race result 
 results = await fetch('https://ergast.com/api/f1/current.json');
    const races = await results.json();
    //console.log(races);

// next race name 
 const next_race = races.MRData.RaceTable.Races[last_round].Circuit.circuitId;
    
// next race information 
 let address = 'https://ergast.com/api/f1/2022/circuits/'+next_race+'/results.json';
    //console.log(address);
    results = await fetch(address);
        const next_race_info = await results.json();
        //console.log(next_race_info);

// qualifying results 
 address = 'https://ergast.com/api/f1/2022/circuits/'+next_race+'/qualifying/1.json';
    results = await fetch(address);
        const qualifying = await results.json();
        //console.log(qualifying);

// fastest lap 
 address = 'https://ergast.com/api/f1/2022/circuits/'+next_race+'/fastest/1/results.json';
    results = await fetch(address);
        const fastest_lap = await results.json();
        //console.log(fastest_lap);


// ALL INJECTIONS 

// Driver ranking 
    injectDriverNames(driver_rankings);
    injectDriversPoints(driver_rankings);
// Constructor ranking 
    injectConstructorRank(1);
    injectConstructorPoints(0,constructors_ranking);
    injectConstructorLogos(0,constructors_ranking,logo_img);
// Next race stats
    injectFirstRowNRS(races,last_round);
    injectLastRowNRS(next_race_info,qualifying,fastest_lap);
};

document.addEventListener("DOMContentLoaded", async () => mainEvent());