let currentRecipe; 
let ingredientsVisible = false; 

document.addEventListener('DOMContentLoaded', function () {
    const recipeNameElement = document.getElementById('recipeTitle');
    const selectedRecipe = localStorage.getItem('selectedRecipe');

    if (selectedRecipe) {
        recipeNameElement.innerText = decodeURIComponent(selectedRecipe);
        const savedRecipe = localStorage.getItem('currentRecipe');

        if (savedRecipe) {
            currentRecipe = JSON.parse(savedRecipe);
            loadRecipe();
            showDetails();
        } else {
            fetchAndLoadRecipe();
        }
    } else {
        recipeNameElement.innerText = 'Recipe not found';
    }
    const ingredientsButton = document.getElementById('ingredientsButton');

    
    ingredientsButton.addEventListener('click', function () {
        toggleIngredients();
    });
});

async function fetchAndLoadRecipe() {
    const recipe = await fetchRandomRecipe();
    const recipeSection = document.getElementById("recipeSection");

    currentRecipe = recipe;

    const currentBackground = getComputedStyle(recipeSection).background;
    recipeSection.style.background = `url(${recipe.strMealThumb}) center/cover no-repeat, ${currentBackground}`;
    recipeSection.style.height='500px';
    recipeSection.style.borderRadius='20px';
    recipeSection.style.marginLeft='10px';
    recipeSection.style.border = '2px solid red';

    localStorage.setItem('currentRecipe', JSON.stringify(recipe));

    loadRecipe();
    showDetails();
}

async function loadRecipe() {
    const recipeSection = document.getElementById("recipeSection");
    const recipeTitleElement = document.getElementById("recipeTitle");

    const currentBackground = getComputedStyle(recipeSection).background;
    recipeSection.style.background = `url(${localStorage.getItem('selectedRecipeImage')}) center/cover no-repeat, ${currentBackground}`;
    recipeSection.style.height='500px';
    recipeSection.style.borderRadius='20px';
    recipeSection.style.marginLeft='10px';

    recipeTitleElement.textContent = decodeURIComponent(localStorage.getItem('selectedRecipe'));
}

function showDetails() {
    const detailsContainer = document.getElementById("detailsContainer");
    detailsContainer.innerHTML = "";

    if (currentRecipe) {
        const detailsText = `Category: ${currentRecipe.strCategory}<br>Area: ${currentRecipe.strArea}<br>Instructions: ${currentRecipe.strInstructions}`;
        detailsContainer.innerHTML = detailsText;
        detailsContainer.style.fontFamily='Poppins';
        detailsContainer.style.fontSize='10px';
        detailsContainer.style.marginTop='100px';
        detailsContainer.style.marginLeft='20px';
    }
}

function toggleIngredients() {
    const ingredientSection = document.getElementById("ingredientSection");
    const ingredientCountContainer = document.getElementById("ingredientCountText");

    ingredientsVisible = !ingredientsVisible;

    if (ingredientsVisible) {
        showIngredients();
        ingredientCountContainer.style.display = "block";
    } else {
        ingredientSection.style.display = "none";
        ingredientCountContainer.style.display = "none";
    }
}

function showIngredients() {
    const ingredientListContainer = document.getElementById("ingredientList");
    const ingredientCountContainer = document.getElementById("ingredientCountText");

    ingredientListContainer.innerHTML = "";
    ingredientCountContainer.textContent = "";

    if (currentRecipe) {
        let ingredientCount = 0;

        for (let i = 1; i <= 20; i++) {
            const ingredient = currentRecipe[`strIngredient${i}`];
            const measure = currentRecipe[`strMeasure${i}`];

            if (ingredient && measure) {
                const listItem = document.createElement("li");
                const icon = document.createElement("img");
                icon.src = `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
                icon.alt = ingredient;
                icon.style.height = '30px';
                icon.style.paddingRight = '10px';
                icon.classList.add("ingredient-icon");
                listItem.appendChild(icon);

                listItem.innerHTML += ` ${measure} ${ingredient}`;
                listItem.classList.add("active");
                ingredientListContainer.appendChild(listItem);

                ingredientCount++;
            }
        }

        ingredientCountContainer.textContent = `${ingredientCount} items`;
        ingredientCountContainer.style.color = '#752A00';
        ingredientCountContainer.style.marginLeft = '20px';

        ingredientListContainer.style.paddingTop = '200px';
        ingredientCountContainer.style.paddingBottom = '10px';
        ingredientCountContainer.style.fontSize = '25px';
        ingredientCountContainer.style.fontFamily = 'Poppins';

        const ingredientSection = document.getElementById("ingredientSection");
        ingredientSection.style.display = "block";
    }
}






// ПРОБУЮ КНОПКУ ВИДЕО ДЛЯ СЕБЯ

async function showVideo() {
    const container = document.getElementById("videoContainer");

    
    container.innerHTML = "";

    if (currentRecipe) {
        const videoURL = currentRecipe.strYoutube;

        if (videoURL) {
            
            const iframe = document.createElement("iframe");
            iframe.src = videoURL;
            iframe.width = "560";
            iframe.height = "315";
            iframe.allowFullscreen = true; 

            
            container.appendChild(iframe);
        } else {
            
            container.textContent = "Video not available for this recipe.";
        }
    }
}



