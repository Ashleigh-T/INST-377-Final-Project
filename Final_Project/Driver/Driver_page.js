

// ALL FUCNTIONS FOR DRIVERS PAGE 

// left side injections 
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

// position injections 
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

    function injectFinishingPostion(finishing_positions,race_names){
        for(let i = 1; i < 6; i++){
            if(finishing_positions[i-1] != null){
            let spot = document.querySelector("#FB"+i+'> p:first-of-type');
                //console.log(spot);
                spot.innerHTML = race_names[i-1];
            spot = document.querySelector("#FB"+i+'> p:last-of-type')
                //console.log(spot);
                spot.innerHTML = finishing_positions[i-1];
            };
        };

    };

// stats box 
    function injectQBoxes(q_times){
        for(let i = 1; i<4; i++){
            let spot = document.querySelector('#q'+ i +' > p:last-of-type');
            //console.log(spot);
            spot.innerHTML = q_times[i-1];
        }
    };

    function injectLeftStats(prev_quali,prev_stats){
        let spot = document.querySelector('#prev_q_time > p');
            //console.log(spot);
            spot.innerHTML = 'Previous Qualifying Time: ' + prev_quali.MRData.RaceTable.Races[0].QualifyingResults[0].Q3;
        spot = document.querySelector('#prev_grid > p');
            //console.log(spot);
            spot.innerHTML = 'Previous Grid Postion: ' + prev_stats.MRData.RaceTable.Races[0].Results[0].grid;
        spot = document.querySelector('#prev_finishing > p');
            //console.log(spot);
            spot.innerHTML = 'Previous Finishing Position: ' + prev_stats.MRData.RaceTable.Races[0].Results[0].position;
    };

    function injectRightStats(prev_stats,circuit_name,round){
        let spot = document.querySelector('#prev_fast_lap > p');
            //console.log(spot);
            spot.innerHTML = 'Previous Fastest Lap: ' + prev_stats.MRData.RaceTable.Races[0].Results[0].FastestLap.Time.time;
        spot = document.querySelector('#sprint > p');
            //console.log(spot);
            if(circuit_name.MRData.RaceTable.Races[0].Sprint != undefined){
                spot.innerHTML = 'Sprint: ' + circuit_name.MRData.RaceTable.Races[0].Sprint.time;
            } else {
                spot.innerHTML = 'Sprint: No';
            };
        spot = document.querySelector('#round > p');
            //console.log(spot);
            spot.innerHTML = 'Round: ' + round;
    };

    function injectRaceName(circuit_info){
        let spot = document.querySelector('.top > h3:nth-child(2)');
            //console.log(spot);
            spot.innerHTML = circuit_info.MRData.RaceTable.Races[0].Circuit.circuitName;
            
    };


async function mainEvent(){

    // all header functionality 
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
    //console.log(localStorage.getItem('Driver'));
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
    let results = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
        const curr_standings= await results.json();
        //console.log(curr_standings);

    // historical standings 
    let address = 'https://ergast.com/api/f1/drivers/'+drivers.get(driver)+'/driverStandings.json';
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

    // finishing positions 
    let finishing_positions = [];
        for(let i = 1; i < 6; i++){
            try{
                address = 'https://ergast.com/api/f1/2023/'+ i +'/drivers/'+ drivers.get(driver) +'/results.json';
                    results = await fetch(address);
                    let finishing_data = await results.json();
                    //console.log(finishing_data);
                    finishing_positions[i-1] = finishing_data.MRData.RaceTable.Races[0].Results[0].position;

            } catch (error){
                finishing_positions[i-1] = null;
            }
        }
        //console.log(finishing_positions);

    // last round 
    const last_round = curr_standings.MRData.StandingsTable.StandingsLists[0].round;

    // Qualifying times 
    let q_times = [];
        address = 'https://ergast.com/api/f1/2023/'+ (Number(last_round) + 1) +'/drivers/'+ drivers.get(driver) +'/qualifying.json';
            results = await fetch(address);
            q_data = await results.json();
            //console.log(q_data);
            try{
                q_times[0] = q_data.MRData.RaceTable.Races[0].QualifyingResults[0].Q1;
            }catch(error){
                q_times[0] = null;
            };

            try{
                q_times[1] = q_data.MRData.RaceTable.Races[0].QualifyingResults[0].Q2;
            }catch(error){
                q_times[1] = null;
            };

            try{
                q_times[2] = q_data.MRData.RaceTable.Races[0].QualifyingResults[0].Q3;
            }catch(error){
                q_times[2] = null;
            };
        //console.log(q_times);

    // circuit name + sprint yay or nah

    address = 'https://ergast.com/api/f1/2023/'+ (Number(last_round) + 1) +'.json';
        //console.log(address);
        results = await fetch(address);
        circuit_info = await results.json();
        //console.log('circuit info');
        //console.log(circuit_info);
        circuit_name = circuit_info.MRData.RaceTable.Races[0].Circuit.circuitId;

            
    // Previous grid + finsihing + fastest lap
    address = 'https://ergast.com/api/f1/2022/drivers/'+ drivers.get(driver) +'/circuits/'+ circuit_name +'/results.json';
        results = await fetch(address);
        const prev_stats = await results.json();
        //console.log(prev_stats);
           
    // Previous qualifying
    address = 'https://ergast.com/api/f1/2022/drivers/'+ drivers.get(driver) +'/circuits/'+ circuit_name +'/qualifying.json';
            results = await fetch(address);
            const prev_quali = await results.json();
            //console.log(prev_quali);


    // ALL INJECTTIONS 

    // all left page injections 
    injectDriverNameAndPhoto(driver,'../Photos/'+ driver_team.get(driver)+ '/'+drivers.get(driver)+'.jpg');
    injectInfoBox(driver_team.get(driver),drivers.get(driver),curr_standings,hist_standings);
    
    // all carousel injections 
    injectGridPosition(grid_positions,race_names);
    injectFinishingPostion(finishing_positions,race_names);

    // all stats box injections 
    injectRaceName(circuit_info);
    injectQBoxes(q_times);
    injectLeftStats(prev_quali,prev_stats);
    injectRightStats(prev_stats,circuit_info,Number(last_round) + 1);

};

document.addEventListener("DOMContentLoaded", async () => mainEvent());