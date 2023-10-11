const foodContainer = document.getElementById("food-container");
const mealModal = document.getElementById("meal-modal");

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
                    <button class="text-xl text-[#FFC107] underline" onclick="loadMeal(${idMeal})">View Details</button>
          </div>
    `;

    foodContainer.appendChild(newDiv);
  });
};

// Load meal by idMeal
const loadMeal = async (mealId) => {
  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const data = await fetch(url);
  const meal = await data.json();
  showMeal(meal.meals[0]);
};

// Show meal to modal
const showMeal = (meal) => {
  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strArea,
    strYoutube,
  } = meal;
  mealModal.classList.remove("hidden");
  mealModal.innerHTML = `
  <div class="h-screen flex justify-center items-center">
    <div class="w-[600px] bg-white rounded-md pt-1 pb-3 px-8">
      <div class="flex justify-between items-center my-5 border-b">
        <h3 class="text-3xl font-bold">${strMeal}</h3>
        <img src="./images/cross.svg" class="cursor-pointer meal-modal-close" alt="">
      </div>
      <img src="${strMealThumb}" class="mb-3 h-40" alt="">
      <div>
        <p class="mb-2"><span class="font-bold">Category :</span> ${strCategory}</p>
        <p class="mb-2"><span class="font-bold">Area :</span> ${strArea}</p>
        <p class="mb-2 h-40 overflow-auto">
          <span class="font-bold">Instructions :</span>
          ${strInstructions}
        </p>
        <p class="mb-2">
          <span class="font-bold">Youtube :</span>
          ${strYoutube}
        </p>
      </div>
      <div class="flex justify-end">
        <button class="bg-[#DC3545] py-2 px-6 text-white rounded-md meal-modal-close">Close</button>
      </div>
    </div>
  </div>
  `;
};

// Close modal Functionality
document.onclick = function (event) {
  let targetedElement = event.target;
  let getClasses = targetedElement.getAttribute("class");
  if (getClasses.includes("meal-modal-close")) {
    let mealModalDiv =
      targetedElement.parentNode.parentNode.parentNode.parentNode;
    mealModal.classList.add("hidden");
  }
};
