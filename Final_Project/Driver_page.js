

// ALL FUCNTIONS FOR DRIVERS PAGE 
function injectDriverNameAndPhoto(name,photo){
    let spot = document.querySelector('#driver_name > h2');
    console.log(spot);
    //spot.innerHTML = '<h2>'+ name +'</h2>'
    spot = document.querySelector('.photo');
    console.log(spot);
    spot.querySelector('img').src = photo;
}

async function mainEvent(){
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
};

document.addEventListener("DOMContentLoaded", async () => mainEvent());