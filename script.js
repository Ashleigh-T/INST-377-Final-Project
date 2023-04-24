
/*
    current i have the bare bones done for this for the main page 
    in the un asyc functions i need to work with the json paths to get the data 
*/

/*
function injectDriverRankings(info){
    console.log('fired injectDriverRankings');
    for (let i = 0; i < 20; i++){
        let name = document.querySelector('#name'+i+1);
            name.innerText = // put path to find info here
        let points = document.querySelector('#points'+i+1);
            points.innerText = // put path to find info here
    }
    console.log('injectDriverRankings done');
}

// if this works with parent selectors change the above method and HTML for the above method as well 
function injectConstructorRankings(info,logoImg){
    console.log('fired injectConstructorsRankings');
    for(let i = 0; i <10; i++){
        let parent = document.querySelector('#CR'+i+1);
        let rank = parent.querySelector('rank');
            rank.innerText = // put path to find info here
        let img = parent.querySelector('image');
            img.innerHTML = "<img class = 'image' src = '" + // put path to find info here + '"/>';
        let points = parent.querySelector('points');
            points.innerText = // put path to find info here
    }
}

function injectNextRaceStats(info){
    console.log('fired injectNextRaceStats');
    let name = document.querySelector('#NRS1');
        name.innerText = // put path to find info here 
    let country = document.querySelector('#NRS2');
        country.innerText = // put path to find info here
    let time = document.querySelector('#NRS#');
        time.innerText = // put path to find info here 
    let round = document.querySelector("#NRS4");
        round.innerText = // put path to find info here 
}

*/

async function mainEvent(){

// this is all for the main page so far 
// below are the varibles that need to be global for everything to work 
    const logoImg = new Map([
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

    const date = newDate();

    let results = await fetch('http://ergast.com/api/f1/current/driverStandings');
        const driverRankings = await results.json();
        console.log(driverRankings);

    results = await fetch ('http://ergast.com/api/f1/current/constructorStandings');
        const constructorsRanking = await results.json();
        console.log(constructorsRanking);

    results = await fetch('http://ergast.com/api/f1/current/last/results');
        const lastRace = await results.json();
        console.log(lastRace);

    const nextRound = lastRace.MRData.RaceTable.Round + 1;

    const nextRaceInfo = await fetch('http://ergast.com/api/f1/{{'+date+'}}/{{'+nextRound+'}}'); // check the date function might have to parse 
    // have to move the data around for only this because it the pain in the ass it is to get the data i want but everything else should work 
    // with just the .json results 

    // all inital injections here 
    injectConstructorRankings(constructorsRanking,logoImg);
    injectDriverRankings(driverRankings);
    injectNextRaceStats(nextRaceInfo);

    // all query selectors here 
    
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());