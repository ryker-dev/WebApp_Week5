//const port = process.env.PORT || '3000';
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
const imageInput = document.getElementById("image-input");
const imageForm = document.getElementById("image-form");

async function fetchRecipe () {
    const response = await fetch(`http://localhost:${port}/recipe/pizza`);
    return response.json();
}

fetchRecipe().then((res) => {
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

btnIngredient.addEventListener("click", function() {
    const text = textIngredient.value;
    ingredientList.push(text);
    console.log(ingredientList);
});

btnInstruction.addEventListener("click", function() {
    const text = textInstruction.value;
    instructionList.push(text);
    console.log(instructionList);
});

const btnSubmit  = document.getElementById('submit');
btnSubmit.addEventListener('click', function() {
    console.log("Posting");
    fetch(`http://localhost:${port}/recipe/`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: `{ "name": "${nameText.value}", "ingredients": ${JSON.stringify(ingredientList)}, "instructions": ${JSON.stringify(instructionList)} }`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    }).catch(
        console.log("Error")
    );
    
    const formdata = new FormData();
    for (const element of imageInput.files) {
        formdata.append("images", element);;
    }
    
    fetch(`http://localhost:${port}/images/`, {
        method: "post",
        body: formdata
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    }).catch(
        console.log("Error")
    );

    /*
    const form = document.getElementById("image-form");
    const images = document.getElementById("image-input");
    const formdata = new FormData();
    formdata.append("images", images);

    const request = new XMLHttpRequest();
    request.open("POST", `http://localhost:${port}/images/`);
    request.send(formdata);*/
});