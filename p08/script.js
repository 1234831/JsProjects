const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const mealContainer = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');

//function to search the meal from api to fetch the data

function searchmeal(e) {
    e.preventDefault()

    //Clear selected meal

    selectedMeal.innerHTML = '';

    //Get the search term from input field
    const term = search.value;

    //check if search term is exists

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results for '${term}: please try a different search'</p>`
                } else {
                    mealContainer.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}"alt=${meal.strMeal}">
                            <div class="meal-info" data-mealId="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>                
                    `)
                        .join('')
                }
            })
    } else {
        alert('please enter a valid search')
    }

    //Clear search term

    search.value = ('');
}


//function to fetch meal data by using meal id
function getMealById(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDom(meal);
        })
}

//function to add a meal to DOM

function addMealToDom(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} -${meal[`strMeasure${i}`]}`)
        }else{
            break;
        }
    };

    selectedMeal.innerHTML = `
        <div class="selected-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-selected-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}     
                ${meal.strArea ? `<p>${meal.strArea }</p>` : ''}       
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map( ingredeint => `<li>${ingredeint}</li>` ).join('')}
                </ul>
            </div>
        </div>
    `;
}
//Event listners
//1- Submit form
submit.addEventListener('submit', searchmeal);

//2- When clicking a meal to get the information of meals
mealContainer.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false
        }
    });
    if (mealInfo) {
        const mealId = mealInfo.getAttribute('data-mealid');
        getMealById(mealId);

    }

})