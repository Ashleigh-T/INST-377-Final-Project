
function injectDriverRankings(driverNames,driverPoints){
    console.log('fired injectDriverRankings');
    for (let i = 1; i < 21; i++){
        let name = document.querySelector('#name'+i);
            console.log("rank "+ i + ": " + driverNames(i));
            name.innerText = driverNames(i);
        let points = document.querySelector('#points'+i);
            console.log("points: " + driverPoints(i));
            points.innerText = driverPoints(i);
    }
    console.log('injectDriverRankings done');
}