// spinner
const toogleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};
const toogleSearchResult = displayStyle => {
    document.getElementById('display-drinks').style.visibility = displayStyle;
};
// search area 
const searchDrinks = () => {
    const searchText = document.getElementById('search-field').value;
    toogleSpinner('block');
    toogleSearchResult('hidden')
    loadDrinks(searchText);
    document.getElementById('search-field').value = '';
};
// load area 
const loadDrinks = async searchText => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDrinks(data.drinks);
};
// display area 
const displayDrinks = drinks => {
    const displayContainer = document.getElementById('display-drinks');
    displayContainer.textContent = '';
    const detailContainer = document.getElementById('display-details');
    detailContainer.textContent = '';
    if (!drinks) {
        document.getElementById('error').style.display = 'block';
    }
    else {
        document.getElementById('error').style.display = 'none';
    }
    drinks?.forEach(drink => {
        const div = document.createElement('div');
        toogleSpinner('block');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="shoeDetails(${drink.idDrink})" class="card h-100">
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${drink.strDrink}</h5>
        <p class="card-text">${drink.strInstructions.slice(0, 150)}</p>
        </div>
        </div>
        `;
        displayContainer.appendChild(div);
    });
    toogleSpinner('none');
    toogleSearchResult('visible');
};
//  load item details 
const shoeDetails = async drinkId => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.drinks[0]);
};
// dispaly item details
const displayDetails = drink => {
    console.log(drink);
    const detailContainer = document.getElementById('display-details');
    detailContainer.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card', 'mb-5');
    div.innerHTML = `
                    <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${drink.strDrink}</h5>
                        <p class="card-title">Id: ${drink.idDrink}</p>
                        <p class="card-title">Type: ${drink.strAlcoholic}</p>
                        <p class="card-text">${drink.strInstructions}</p>
                    </div>
    `;
    detailContainer.appendChild(div);
};

