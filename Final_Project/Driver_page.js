

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

function injectInfoBox(team,curr_standings,hist_standings){

};

function injectGridPosition(){

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
        console.log(curr_standings);

    // historical standings 
    let address = 'http://ergast.com/api/f1/drivers/'+drivers.get(driver)+'/driverStandings.json';
        results = await fetch(address);
        const hist_standings = await results.json();
        console.log(hist_standings);



    // ALL INJECTTIONS 

    
    injectDriverNameAndPhoto(driver,'Photos/'+ driver_team.get(driver)+ '/'+drivers.get(driver)+'.jpg');

};

document.addEventListener("DOMContentLoaded", async () => mainEvent());