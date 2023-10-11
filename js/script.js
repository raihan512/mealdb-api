let searchText;
// Default Data loading state
searchText = "b";
loadData(searchText, false);
// Load Data with search value
searchBoxBtn.onclick = function () {
  searchText = searchBox.value;
  loadData(searchText, false);
};

// -------------------------------------------------------Load Data from API-------------------------------------------------------
async function loadData(searchText, showAllData) {
  loading(true);
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`;
  try {
    const getData = await fetch(url);
    const data = await getData.json();
    processMeals(data.meals, showAllData);
  } catch (err) {
    processMeals([]);
  }
}

// ---------------------------------------------------Process Meals based on Data---------------------------------------------------
function processMeals(data, showAllData) {
  // if show all btn clicked
  if (showAllData) {
    showMeals(data);
  }
  // if show all btn not clicked
  else {
    // if data is more than 6 then display show all btn
    if (data.length > 6) {
      showMeals(data.slice(0, 6));
      allFoodBtn.classList.remove("hidden");
    }
    // if data is less than 6 then do not display show all btn
    else {
      showMeals(data);
      allFoodBtn.classList.add("hidden");
    }
  }
}

// --------------------------------------------------Show all button click action--------------------------------------------------
allFoodBtn.addEventListener("click", function () {
  loadData(searchText, true);
  allFoodBtn.classList.add("hidden");
});

// ----------------------------------------------------Display meals item to UI----------------------------------------------------
const showMeals = (meals) => {
  foodContainer.innerHTML = "";
  loading(false);
  // if searched value has at least 1 data then show it to UI
  if (meals.length > 0) {
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
                    <h3 class="md:text-2xl font-bold">${
                      strMeal.length > 20
                        ? strMeal.slice(0, 20) + " ..."
                        : strMeal
                    }</h3>
                    <p class="md:text-xl py-1">${
                      strInstructions.length > 70
                        ? strInstructions.slice(0, 70) + " ..."
                        : strInstructions
                    }</p>
                    <button class="md:text-xl text-[#FFC107] underline" onclick="loadMeal(${idMeal})">View Details</button>
          </div>
    `;

      foodContainer.appendChild(newDiv);
    });
  }
  // if searched values has no data the show this message
  else {
    foodContainer.innerHTML = `
    <div class="py-20 w-full flex justify-center">
      <h2 class="text-2xl text-center font-bold text-red-500">No Data has been found</h2>
    </div>
    `;
  }
};
