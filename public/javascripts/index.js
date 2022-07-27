//const port = process.env.PORT || '3000';
const fetchedCategories = {};
const ingredientList = [];
const instructionList = [];
const port = 1234;

const btnIngredient = document.getElementById("add-ingredient");
const textIngredient = document.getElementById("ingredients-text")
const btnInstruction = document.getElementById("add-instruction");
const textInstruction = document.getElementById("instructions-text")
const nameText = document.getElementById("name-text");
const container = document.getElementById("recipe-container");
const viewname = document.getElementById("recipe-name");
const viewingredients = document.getElementById("view-ingredients");
const viewinstructions = document.getElementById("view-instructions");
const cameraFileInput = document.getElementById("camera-file-input");
const imageForm = document.getElementById("image-form"); //not in use
const addedIngredients = document.getElementById("added-ingredients");
const addedInstructions = document.getElementById("added-instructions");
const searchBar = document.getElementById("search-recipe");
const selectCategories = document.getElementById("select-categories");
const submitRecipeForm = document.getElementById("submit-recipe-form");

async function fetchRecipe (recipeName) {
    const response = await fetch(`http://localhost:${port}/recipe/${recipeName}`);
    return response.json();
}

async function fetchCategories () {
    const response = await fetch(`http://localhost:${port}/category/`);
    return response.json();
}

function onBodyLoad() {
    // Get the recipe categories from db
    fetchCategories().then((res) => {
        console.log(res);
        res.forEach(element => {
            const name = element.name;
            fetchedCategories[name] = element._id;
            const line = document.createElement("p");
            line.innerHTML = `
            <label>
              <input type="checkbox" name=${name} />
              <span>${name}</span>
            </label>
          `;
            selectCategories.appendChild(line);
        });
    })
    console.log(fetchedCategories);
};

searchBar.addEventListener('change', (event) => {
    //console.log("Test");
    const recipeName = searchBar.value;
    console.log(recipeName);
    
    fetchRecipe(recipeName).then((res) => {
        console.log(res.name);
        viewname.innerText = res.name;
        res.ingredients.forEach(element => {
            const line = document.createElement("li");
            line.innerText = element;
            viewingredients.appendChild(line);
        });
        res.instructions.forEach(element => {
            const line = document.createElement("li");
            line.innerText = element;
            viewinstructions.appendChild(line);
        });
    
    });
});

btnIngredient.addEventListener("click", function() {
    const text = textIngredient.value;
    ingredientList.push(text);
    console.log(ingredientList);

    const element = document.createElement("li");
    element.innerText = text;
    addedIngredients.appendChild(element);
});

btnInstruction.addEventListener("click", function() {
    const text = textInstruction.value;
    instructionList.push(text);
    console.log(instructionList);

    const element = document.createElement("li");
    element.innerText = text;
    addedInstructions.appendChild(element);
});

const btnSubmit  = document.getElementById('submit');
submitRecipeForm.addEventListener('submit', function() {
    console.log("Posting");
    
     const categoryCheckboxes = document.querySelectorAll('input:checked')
     console.log(categoryCheckboxes);

    const categories = [];
    categoryCheckboxes.forEach(box => {
        //console.log(box.name);
        //console.log(fetchedCategories);
        console.log(fetchedCategories[box.name]);
        categories.push(fetchedCategories[box.name]);
    });

    console.log(categories);

    //"categories": ${JSON.stringify([categories])}

    // Handle recipe elements
    /*
    fetch(`http://localhost:${port}/recipe/`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body:
        `{
            "name": "${nameText.value}",
            "ingredients": ${JSON.stringify(ingredientList)},
            "instructions": ${JSON.stringify(instructionList)},
            "categories": ${JSON.stringify(categories)}
        }`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    }).catch( error => console.log(error));
    */

    // Handle image
    /*
    const formdata = new FormData();
    for (const element of cameraFileInput.files) {
        formdata.append("images", element);
    }
    
    fetch(`http://localhost:${port}/images/`, {
        method: "post",
        body: {}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    }).catch( (error) => console.log(error));
    */
});