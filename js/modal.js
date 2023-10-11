const mealModal = document.getElementById("meal-modal");
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
  let targetedElement = event.target.getAttribute("class");
  if (targetedElement.includes("meal-modal-close")) {
    mealModal.classList.add("hidden");
  }
};
