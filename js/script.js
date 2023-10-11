const foodContainer = document.getElementById("food-container");

// Load allmeals
(async function loadmeals() {
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?f=c";
  const data = await fetch(url);
  const meals = await data.json();
  showMeals(meals.meals);
})();

// Show meals items to the UI
const showMeals = (meals) => {
  meals.forEach((meal) => {
    const { idMeal, strMeal, strInstructions, strMealThumb } = meal;

    let newDiv = document.createElement("div");
    newDiv.setAttribute(
      "class",
      "w-[580px] rounded-md overflow-hidden border flex items-center mb-8"
    );
    newDiv.innerHTML = `
          <div class="w-[180px]">
            <img src="${strMealThumb}" alt="">
          </div>
          <div class="w-[400px] p-3">
                    <h3 class="text-2xl font-bold">${
                      strMeal.length > 20
                        ? strMeal.slice(0, 20) + " ..."
                        : strMeal
                    }</h3>
                    <p class="text-xl py-1">${
                      strInstructions.length > 70
                        ? strInstructions.slice(0, 70) + " ..."
                        : strInstructions
                    }</p>
                    <a class="text-xl text-[#FFC107] underline" href="">View Details</a>
          </div>
    `;

    foodContainer.appendChild(newDiv);
  });
};
