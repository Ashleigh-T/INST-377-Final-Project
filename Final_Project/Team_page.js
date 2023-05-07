

function injectPhotosAndNames(team_name,photo1,name1,photo2,name2){
    let spot = document.querySelector('#image1')
        spot.querySelector('img').src = photo1;
    spot = document.querySelector('#image2');
        spot.querySelector('img').src = photo2;
    spot = document.querySelector('#team_name > h2');
        spot.innerHTML = team_name;
    spot = document.querySelector('.D1 > .box:first-of-type > h3:first-of-type');
        //console.log(spot);
        spot.innerHTML = name1;
    spot = document.querySelector('.D2 > .box:first-of-type > h3:first-of-type');
        spot.innerHTML = name2;
};

function injectStats1(driver1_info,driver1_debut){
    let spot = document.querySelector('#driver_stats1 >li:nth-of-type(1)');
        spot.innerHTML = driver1_info.Driver.permanentNumber;
    spot = document.querySelector('#driver_stats1 >li:nth-of-type(2)');
        spot.innerHTML = driver1_info.position;
    spot = document.querySelector('#driver_stats1 >li:nth-of-type(3)');
        spot.innerHTML = driver1_info.points;
    spot = document.querySelector('#driver_stats1 >li:nth-of-type(4)');
        spot.innerHTML = driver1_debut;
};

function injectStats2(){

};

function injectRaceRecord1(){

};

function injectRaceRecord2(){

};

function injectLogoAndCar(){

};

function injectInfoBox(){

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

    const team = localStorage.getItem('Team');

    const drivers = new Map([
        ['max_verstappen','Max Verstappen'],
        ['perez','Sergio Perez'],
        ['alonso','Fernando Alonso'],
        ['hamilton','Lewis Hamilton'],
        ['sainz','Carlos Sainz'],
        ['leclerc','Charles Leclerc'],
        ['russell','George Russell'],
        ['stroll','Lance Stroll'],
        ['norris','Lando Norris'],
        ['hulkenberg','Nico Hulkenberg'],
        ['piastri','Oscar Piastri'],
        ['bottas','Valtteri Bottas'],
        ['ocon','Esteban Ocon'],
        ['gasly','Pierre Gasly'],
        ['zhou','Zhou Guanyu'],
        ['tsunoda','Yuki Tsunoda'],
        ['albon','Alex Albon'],
        ['kevin_magnussen','Kevin Magnussen'],
        ['sargeant','Logan Sargeant'],
        ['de_vries','Nyck De Vries']
    ]);

    const teams = new Map([
        ['RedBull','red_bull'],
        ['Mercedes','mercedes'],
        ['Alpine','alpine'],
        ['Aston Martin','aston_martin'],
        ['AlphaTauri','alphatauri'],
        ['Ferrari','ferrari'],
        ['McLaren','mclaren'],
        ['Alfa Romeo','alfa'],
        ['Haas','haas'],
        ['Williams','williams']
    ]);

    // ALL API CALLS 

    // team info 

    // gives points + constructors rank 
    let results = await fetch('http://ergast.com/api/f1/current/constructorStandings.json');
        const constructor_info = await results.json();
        //console.log(constructor_info);

        let team_info;
        for(let i = 0; i < 10; i++){
            if(constructor_info.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i].Constructor.constructorId == teams.get(team)){
                team_info = constructor_info.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i];
            };
        };

        console.log(team_info);

    // debut year 
    results = await fetch('http://ergast.com/api/f1/constructors/'+ teams.get(team)+'/constructorStandings.json');
        const debut = await results.json();
        console.log(debut);

    // drivers - driverId's
    results = await fetch('https://ergast.com/api/f1/2023/constructors/'+ teams.get(team) +'/drivers.json');
        const team_drivers = await results.json();
        console.log(team_drivers);
    
        const driver1 = team_drivers.MRData.DriverTable.Drivers[0].driverId;
        const driver2 = team_drivers.MRData.DriverTable.Drivers[1].driverId;
        //console.log(driver1);
        //console.log(driver2);
    // driver info

    // rank number points 
    results = await fetch('http://ergast.com/api/f1/current/driverStandings.json');
        const curr_standing = await results.json();
        console.log(curr_standing);
        let driver1_info;
        let driver2_info;
        for(let i = 0; i < 20; i++){
            //console.log(i);
            if(curr_standing.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.driverId == driver1){
                driver1_info = curr_standing.MRData.StandingsTable.StandingsLists[0].DriverStandings[i];
            } else if (curr_standing.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.driverId == driver2){
                driver2_info = curr_standing.MRData.StandingsTable.StandingsLists[0].DriverStandings[i];
            }
        };
        console.log(driver1_info);
        console.log(driver2_info);

    // driver 1 debut year 
    results = await fetch('https://ergast.com/api/f1/drivers/'+ driver1 +'/driverStandings.json');
        const driver1_standings = await results.json();
        //console.log(driver1_standings);
            let driver1_debut;
            let length = driver1_standings.MRData.total;
            //console.log(length);
            let year_found = false;
            for(let i = 0; i < length; i++){
                if(year_found == false  && driver1_standings.MRData.StandingsTable.StandingsLists[i].DriverStandings[0].Constructors[0].constructorId == teams.get(team)){
                    driver1_debut = driver1_standings.MRData.StandingsTable.StandingsLists[i].season;
                    year_found = true;
                };
            };
        console.log(driver1_debut);

    // driver 2 debut year 
    results = await fetch('https://ergast.com/api/f1/drivers/'+ driver2 +'/driverStandings.json');
        const driver2_standings = await results.json();
        //console.log(driver2_standings);
            let driver2_debut;
            length = driver2_standings.MRData.total;
            //console.log(length);
            year_found = false;
            for(let i = 0; i < length; i++){
                if(year_found == false  && driver2_standings.MRData.StandingsTable.StandingsLists[i].DriverStandings[0].Constructors[0].constructorId == teams.get(team)){
                    driver2_debut = driver2_standings.MRData.StandingsTable.StandingsLists[i].season;
                    year_found = true;
                };
            };
        console.log(driver2_debut);


    

    // ALL INJECTIONS 
        
    injectPhotosAndNames(team,'Photos/'+ team +'/'+ driver1 + '.jpg',
                            drivers.get(driver1),
                            'Photos/'+ team +'/'+ driver2 + '.jpg',
                            drivers.get(driver2));

    injectStats1(driver1_info,driver1_debut);
    injectStats2(driver2_debut,driver2_debut);


};

document.addEventListener("DOMContentLoaded", async () => mainEvent());