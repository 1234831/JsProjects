//Getting dom elements
const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleMoneyButton = document.getElementById('double');
const showMillionairesButton = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const totalButton = document.getElementById('calculate-total');

//Initialize Data Array
let data = [];

//Create initial user
generateRandomUser();
generateRandomUser();
generateRandomUser();

//Function to fetch random user api
//API: randomuser.me/api

async function generateRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        worth: Math.round(Math.random() * 1000000)
    }
    addData(newUser);
}

//function to double the for each user
function doubleWorth() {
    data = data.map(item => {
        return {...item, worth: item.worth * 2 };

    });

    updateDOM();
}

//Function to sort the richest users
function sortRichest() {
    data.sort((a, b) => b.worth - a.worth);


    updateDOM();
}

//Function to filter the user and show only millionaires
function showMillionaires() {
    data = data.filter(
        item => item.worth > 1000000
    );
    updateDOM();
}

//Function calculate total net worth of all users
function calculateTotalNetWorth() {
    const totalWorth = data.reduce(
        (acc, item) => (acc += item.worth), 0
    );

    const totalNetWorthElement = document.createElement('div');
    totalNetWorthElement.innerHTML = `<h3>Total Net Worth:<strong>${formatCurrency(totalWorth)}</strong></h3>`;
    main.appendChild(totalNetWorthElement);

}


//add newly generated user into the data array
function addData(newUser) {
    data.push(newUser);

    updateDOM();
}

//Function to update the UI with DOM

function updateDOM(inputData = data) {
    main.innerHTML = '<h2><strong>Name</strong> Net Worth</h2>';

    inputData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `<strong>${item.name}</strong> PKR${formatCurrency(item.worth)}`;
        main.appendChild(element);

    });
}

//Function to format a number as a currency

function formatCurrency(num) {
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event listners

//1-Add users

addUserButton.addEventListener('click', generateRandomUser);

//2-double money
doubleMoneyButton.addEventListener('click', doubleWorth);

//3- Sort eventlistner 
sortButton.addEventListener('click', sortRichest);

//4-Add show millionaires eventlistner
showMillionairesButton.addEventListener('click', showMillionaires);

//5-Add calculate total waelth event listner
totalButton.addEventListener('click', calculateTotalNetWorth);