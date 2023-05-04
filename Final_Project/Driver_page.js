

// ALL FUCNTIONS FOR DRIVERS PAGE 
function injectDriverNameAndPhoto(name,photo){
    //console.log('inside injectDriverName+Photo');
    let spot = document.querySelector('#driver_name > h2');
    //console.log(spot);
    spot.innerHTML = '<h2>'+ name +'</h2>'
    spot = document.querySelector('.photo');
    //console.log(spot);
    spot.querySelector('img').src = photo;
};

function injectInfoBox(team,key,curr_standings,hist_standings){
    let spot = document.querySelector('.info_box > p:nth-of-type(1)');
        spot.innerHTML = 'Team: '+ team;

    let index = -1;
        for(let i = 0; i <20 ; i++){
            if (curr_standings.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.driverId == key){
                index = i;
            };
        };
        //console.log(index);

    spot = document.querySelector('.info_box > p:nth-of-type(2)');
        spot.innerHTML = 'Driver #: ' + curr_standings.MRData.StandingsTable.StandingsLists[0].DriverStandings[index].Driver.permanentNumber;
    spot = document.querySelector('.info_box > p:nth-of-type(3)');
        spot.innerHTML = 'Rank: ' + curr_standings.MRData.StandingsTable.StandingsLists[0].DriverStandings[index].position;
    spot = document.querySelector('.info_box > p:nth-of-type(4)');
        spot.innerHTML = 'Points: ' + curr_standings.MRData.StandingsTable.StandingsLists[0].DriverStandings[index].points;
    spot = document.querySelector('.info_box > p:nth-of-type(5)');
        spot.innerHTML = 'Debut: ' + hist_standings.MRData.StandingsTable.StandingsLists[0].season;
};

function injectGridPosition(grid_positions,race_names){
    for(let i = 1; i < 6; i++){
        if(grid_positions[i-1] != null){
        let spot = document.querySelector("#GB"+i+'> p:first-of-type');
            //console.log(spot);
            spot.innerHTML = race_names[i-1];
        spot = document.querySelector("#GB"+i+'> p:last-of-type')
            //console.log(spot);
            spot.innerHTML = grid_positions[i-1];
        };
    };


};

function injectFinishingPostion(){

};

function injectQBoxes(){

};

function injectLeftStats(){

};

function injectRightStats(){

};

async function mainEvent(){

    console.log('in main event');
    const left_button = document.querySelector('#left_button');
    const right_button = document.querySelector('#right_button');

    const driver = localStorage.getItem('Driver');
        //console.log(driver);
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
        ['Max Verstappen', 'RedBull'],
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
        ['Nyck De Vries','AlphaTauri']
    ]);   
    
   // API REQUESTS 

    // current standings 
    let results = await fetch('http://ergast.com/api/f1/current/driverStandings.json');
        const curr_standings= await results.json();
        //console.log(curr_standings);

    // historical standings 
    let address = 'http://ergast.com/api/f1/drivers/'+drivers.get(driver)+'/driverStandings.json';
        results = await fetch(address);
        const hist_standings = await results.json();
        //console.log(hist_standings);

    
    // grid positions + race names for first 5 races 
    let grid_positions = [];
    let race_names = [];
        for(let i = 1; i < 6; i++){
            try{
            address = 'https://ergast.com/api/f1/2023/'+ i +'/drivers/'+ drivers.get(driver) +'/qualifying.json';
                results = await fetch(address);
                let grid_data = await results.json();
                //console.log('race: '+i);
                //console.log(grid_data);
                grid_positions[i-1] = grid_data.MRData.RaceTable.Races[0].QualifyingResults[0].position;
                race_names[i-1] = grid_data.MRData.RaceTable.Races[0].Circuit.circuitName;
            } catch (error){
                grid_positions[i-1] = null;
                race_names[i-1] = null;
            }
        };
        //console.log(grid_positions);
        //console.log(race_names);

    // ALL INJECTTIONS 

    // all left page injections 
    injectDriverNameAndPhoto(driver,'Photos/'+ driver_team.get(driver)+ '/'+drivers.get(driver)+'.jpg');
    injectInfoBox(driver_team.get(driver),drivers.get(driver),curr_standings,hist_standings);
    
    // all carousel injections 
    injectGridPosition(grid_positions,race_names);
};

document.addEventListener("DOMContentLoaded", async () => mainEvent());