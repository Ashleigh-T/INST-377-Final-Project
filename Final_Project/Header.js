
async function mainEvent(){
const driver_page = document.querySelectorAll('.driver_button');
const team_page = document.querySelectorAll('.team_button');

driver_page.forEach( item => {
    item.addEventListener('click', (event) => {
       //console.log(item.innerHTML);
        localStorage.setItem('Driver',item.innerHTML)
    }); 
});

team_page.forEach( item => {
    item.addEventListener('click',(event) => {
        console.log(item.innerHTML);
        localStorage.setItem('Team',item.innerHTML)
    });
});
};

document.addEventListener("DOMContentLoaded", async () => mainEvent());