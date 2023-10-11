const spinner = document.getElementById("spinner");
const searchBox = document.getElementById("search-box");
const allFoodBtn = document.getElementById("all-food-btn");
const searchBoxBtn = document.getElementById("search-box-btn");
const foodContainer = document.getElementById("food-container");

function loading(isLoading) {
  if (isLoading) {
    spinner.classList.remove("hidden");
    foodContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    foodContainer.classList.remove("hidden");
  }
}
