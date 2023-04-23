
function injectDriverRankings(driverNames,driverPoints){
    console.log('fired injectDriverRankings');
    for (let i = 0; i < 20; i++){
        let name = document.querySelector('#name'+i+1);
            console.log("rank "+ i + ": " + driverNames(i));
            name.innerText = driverNames(i);
        let points = document.querySelector('#points'+i+1);
            console.log("points: " + driverPoints(i));
            points.innerText = driverPoints(i);
    }
    console.log('injectDriverRankings done');
}

// if this works with parent selectors change the above method and HTML for the above method as well 
function injectConstructorRankings(constructorsRank,constructorsPoints,constructorImage){
    console.log('fired injectConstructorsRankings');
    for(let i = 0; i <10; i++){
        let parent = document.querySelector('#CR'+i+1);
        let rank = parent.querySelector('rank');
            rank.innerText = constructorsRank(i);
        let img = parent.querySelector('image');
            img.innerHTML = "<img class = 'image' src = '" + constructorImage(i) + '"/>';
        let points = parent.querySelector('points');
            points.innerText = constructorsPoints(i);
    }
}

function injectNextRaceStats(list,img){
    console.log('fired injectNextRaceStats');
    let name = document.querySelector('#NRS1');
        name.innerText = list(0);
    let country = document.querySelector('#NRS2');
        country.innerText = list(1);
        let img = country.querySelector(".image");
        img.innerHTML = "<img class = 'image' scr = '" + img +"'/>";
    let time = document.querySelector('#NRS#');
        time.innerText = list(2);
    let round = document.querySelector("#NRS4");
        round.innerText = list(3);
}

async function mainEvent(){

    const storedData = localStorage.getItem('storedData');
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
    
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());