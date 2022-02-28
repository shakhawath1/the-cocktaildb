const loadDrinks = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDrinks(data.drinks);
    searchField.value = '';
}
const displayDrinks = drinks => {
    console.log(drinks);
    const displayContainer = document.getElementById('display-drinks');
    drinks.forEach(drink => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                    <div class="card h-100">
                        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${drink.strDrink}</h5>
                            <p class="card-text">${drink.strInstructions.slice(0, 150)}</p>
                        </div>
                    </div>
        
        `
        displayContainer.appendChild(div);
    });
};

