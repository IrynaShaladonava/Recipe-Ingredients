document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('.search');
  const mealCardsContainer = document.querySelector('.row-cols-1');
  const searchedCategories = document.getElementById('searchedCategories');


  async function fetchMeals(searchTerm) {
      const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.meals;
  }

  function extractCategories(meals) {
    const categories = new Set();

    meals.forEach(meal => {
        categories.add(meal.strCategory);
    });

    return Array.from(categories);
}

function displayCategories(categories) {
    searchedCategories.innerHTML = '';

    categories.forEach(category => {
        const categoryButton = document.createElement('div');
        categoryButton.className = category;
        categoryButton.innerHTML = `
            <a href="#" class="btn btn-danger me-2 rounded">${category}</a>
        `;
        searchedCategories.appendChild(categoryButton);

        
        categoryButton.addEventListener('click', function () {
            searchInput.value = category;
            
        });
    });
}


  function displayMeals(meals) {
      mealCardsContainer.innerHTML = '';
      

      if (!meals) {
        mealCardsContainer.innerHTML = 'No meals were found matching your request.';
        return;
      }

      meals.forEach(meal => {
        const card = createMealCard(meal);
        mealCardsContainer.appendChild(card);
      });

        setCardClickEvents();
      
  }

  function createMealCard(meal) {
    const card = document.createElement('div');
    card.className = 'col';
    card.innerHTML = `
        <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>                      
                <p class="card-text">25 min • ${meal.strCategory}</p>
            </div>
        </div>
    `;
    return card;
}

  function setCardClickEvents() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function () {
            showRecipeDetails(card);
        });
    });
}

  searchInput.addEventListener('input', async function () {
      const searchTerm = searchInput.value.trim();

      if (searchTerm === '') {
          mealCardsContainer.innerHTML = '';
          searchedCategories.innerHTML = '';
          return;
      }

      try {
        const meals = await fetchMeals(searchTerm);
        displayMeals(meals);

        const categories = extractCategories(meals);
        displayCategories(categories);
      } catch (error) {
        console.error('Error', error);
      }
  });


function showRecipeDetails(card) {
    const recipeName = card.querySelector('.card-title').innerText;
    const sanitizedRecipeName = encodeURIComponent(recipeName);
    localStorage.setItem('selectedRecipe', sanitizedRecipeName);
    localStorage.setItem('selectedRecipeImage', card.querySelector('.card-img-top').src);
    window.location.href = 'index%20Ingredients.html';
    }
});






