let name=document.querySelector("#placeholder");
const searchButton=document.querySelector("#searchButton");
searchButton.addEventListener("click", searchRecipe);
function displayRecipe(meals) {
    const result = document.querySelector("#result");
    result.innerHTML = "";

    if (!meals) {
        result.innerHTML = "<p style='text-align:center;'>Oops! No such recipe found.</p>";
        return;
    }

    const meal = meals[0];

    // Build ingredients list
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredientsList += `<li>${ingredient} :  ${measure}</li>`;
        }
    }

    // Set the result content
    result.innerHTML = `
        <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 250px;">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100%; border-radius: 10px;" />
            </div>
            <div style="flex: 2; min-width: 250px;">
                <h2 style="font-weight: bold";>${meal.strMeal}</h2>
                <br>
                <h3 style="font-weight: 500";>Category : ${meal.strCategory}</h3>
                <h3 style="font-weight: 500";>Area : ${meal.strArea}</h3>
                <br>
                <h3 style="font-weight: bold";>Ingredients :</h3>
                <br>
                <ul style="list-style-type: disc; padding-left: 20px;font-weight:400;">
                    ${ingredientsList}
                </ul>
            </div>
        </div>
        <div style="margin-top: 2rem;">
            <h3 style="font-weight: bold";>Instructions:</h3>
            <br>
            <p style="text-align: justify; font-weight:400;">${meal.strInstructions}</p>
            <br>
            <br>
        </div>
        <div>
            <a href="${meal.strYoutube}" target="_blank" style="color:#8b5e3c; font-weight:bold; text-decoration:underline;">Watch on Youtube</a>
        </div>
        <br>
        <br>
        <br>
    `;
}


function searchRecipe(){
    const query=name.value.trim(); // trim to remove extra space in input
    if(!query)
        return;
    else{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(response=>response.json())
    .then(data=>displayRecipe(data.meals))
    .catch(error=>console.log("Error: ",error));
    }

}