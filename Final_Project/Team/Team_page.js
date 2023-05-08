

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

function injectStats2(driver2_info,driver2_debut){
    let spot = document.querySelector('#driver_stats2 >li:nth-of-type(1)');
        spot.innerHTML = driver2_info.Driver.permanentNumber;
    spot = document.querySelector('#driver_stats2 >li:nth-of-type(2)');
        spot.innerHTML = driver2_info.position;
    spot = document.querySelector('#driver_stats2 >li:nth-of-type(3)');
        spot.innerHTML = driver2_info.points;
    spot = document.querySelector('#driver_stats2 >li:nth-of-type(4)');
        spot.innerHTML = driver2_debut;
};

function injectRaceRecord1(finishing_positions1,race_names){
    for(let i = 1; i < 6; i++){
        if(finishing_positions1[i-1] != null){
            let spot = document.querySelector("#RR1"+i + ' > p:first-of-type');
                //console.log(spot);
                spot.innerHTML = race_names[i-1];
            spot = document.querySelector("#RR1"+i+' > p:last-of-type')
                //console.log(spot);
                spot.innerHTML = finishing_positions1[i-1];
        };
    };
};

function injectRaceRecord2(finishing_positions2,race_names){
    for(let i = 1; i < 6; i++){
        if(finishing_positions2[i-1] != null){
            let spot = document.querySelector("#RR2"+i + ' > p:first-of-type');
                //console.log(spot);
                spot.innerHTML = race_names[i-1];
            spot = document.querySelector("#RR2"+i+' > p:last-of-type')
                //console.log(spot);
                spot.innerHTML = finishing_positions2[i-1];
        };
    };
};

function injectLogoAndCar(logo,car){
    console.log(logo);
    console.log(car);
    let spot = document.querySelector('.info_box > img');
        spot.src = logo;
    spot = document.querySelector('#car > img');
        spot.src = car;
        
    
};

function injectInfoBox(principle,team_info,debut){
    let spot = document.querySelector('.info_box > p:nth-of-type(1)');
        spot.innerHTML = principle;
    spot = document.querySelector('.info_box > p:nth-of-type(2)');
        spot.innerHTML = team_info.position;
    spot = document.querySelector('.info_box > p:nth-of-type(3)');
        spot.innerHTML = team_info.points;
    spot = document.querySelector('.info_box > p:nth-of-type(4)');
        spot.innerHTML = debut.MRData.StandingsTable.StandingsLists[0].season;

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
    let results = await fetch('https://ergast.com/api/f1/current/constructorStandings.json');
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
    results = await fetch('https://ergast.com/api/f1/constructors/'+ teams.get(team)+'/constructorStandings.json');
        const debut = await results.json();
        console.log(debut);

    // drivers - driverId's
    results = await fetch('https://ergast.com/api/f1/2023/constructors/'+ teams.get(team) +'/drivers.json');
        const team_drivers = await results.json();
        //console.log(team_drivers);
    
        const driver1 = team_drivers.MRData.DriverTable.Drivers[0].driverId;
        const driver2 = team_drivers.MRData.DriverTable.Drivers[1].driverId;
        //console.log(driver1);
        //console.log(driver2);
    // driver info

    // rank number points 
    results = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
        const curr_standing = await results.json();
        //console.log(curr_standing);
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
        //console.log(driver1_info);
        //console.log(driver2_info);

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
       // console.log(driver1_debut);

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
       // console.log(driver2_debut);
    

       // finishing postions for driver 1 + race names 
        let finishing_positions1 = [];
        let race_names = []
        for(let i = 1; i < 6; i++){
            try{
                address = 'https://ergast.com/api/f1/2023/'+ i +'/drivers/'+ driver1 +'/results.json';
                    results = await fetch(address);
                    let finishing_data = await results.json();
                    //console.log('finishing data')
                    //console.log(finishing_data);
                    finishing_positions1[i-1] = finishing_data.MRData.RaceTable.Races[0].Results[0].position;
                    race_names [i-1] = finishing_data.MRData.RaceTable.Races[0].raceName;
            } catch (error){
                finishing_positions1[i-1] = null;
                race_names [i-1] = null;
            };
        };

        // finishing postions for driver 2
        let finishing_positions2 = [];
        for(let i = 1; i < 6; i++){
            try{
                address = 'https://ergast.com/api/f1/2023/'+ i +'/drivers/'+ driver2 +'/results.json';
                    results = await fetch(address);
                    let finishing_data = await results.json();
                    //console.log('finishing data')
                    //console.log(finishing_data);
                    finishing_positions2[i-1] = finishing_data.MRData.RaceTable.Races[0].Results[0].position;
            } catch (error){
                finishing_positions2[i-1] = null; 
            };
        };


        //console.log(finishing_positions1);
        //console.log(finishing_positions2);
        //console.log(race_names);

    

    // ALL INJECTIONS 
        
    injectPhotosAndNames(team,'../Photos/'+ team +'/'+ driver1 + '.jpg',
                            drivers.get(driver1),
                            '../Photos/'+ team +'/'+ driver2 + '.jpg',
                            drivers.get(driver2));

    // stats injections 
    injectStats1(driver1_info,driver1_debut);
    injectStats2(driver2_info,driver2_debut);

    // race record injections 
    injectRaceRecord1(finishing_positions1,race_names);
    injectRaceRecord2(finishing_positions2,race_names);

    // info box + car
    injectLogoAndCar('../Photos/'+ team +'/logo.jpg','../Photos/'+ team + '/car.jpg');
    injectInfoBox('Hi',team_info,debut);
    


};

document.addEventListener("DOMContentLoaded", async () => mainEvent());