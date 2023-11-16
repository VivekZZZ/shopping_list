const addItemBtn = document.getElementById("addItemBtn");
const shoppingList = document.getElementById("shoppingList");

//-----------------load items when page loads------------------

const storedItems = JSON.parse(localStorage.getItem("shoppingItems")) || [];
storedItems.forEach((itemText) => {
  createNewItem(itemText);
});

//-----------------------add items---------------------------

addItemBtn.addEventListener("click", () => {
  const newItemInput = document.getElementById("newItem").value.trim();
  console.log(newItemInput);
  if (newItemInput !== "") {
    // -------------save list to local storage---------------------

    createNewItem(newItemInput);
    const currentItems =
      JSON.parse(localStorage.getItem("shoppingItems")) || [];
    currentItems.push(newItemInput);
    localStorage.setItem("shoppingItems", JSON.stringify(currentItems));
  }
});

// ----------------Add items-----------------------------------

function createNewItem(itemText) {
  const newItemDiv = document.createElement("div");
  let x = document.querySelector("#newItem")
  newItemDiv.className = "item";
  newItemDiv.innerHTML = `<div id="items">
            <div class="item-name"><p>${itemText}</p></div>
            <button class="btn-delete">delete</button> 
            </div>`;
  shoppingList.appendChild(newItemDiv);
  // console.log(newItemDiv.value);
  newItemDiv.value = "";
  x.value=""
  console.log()
}

//-----------------delete items-----------------------

shoppingList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const itemDiv = e.target.closest(".item");
    if (itemDiv) {
      const itemText = itemDiv.querySelector(".item-name p").textContent;
      const currentItems =
        JSON.parse(localStorage.getItem("shoppingItems")) || [];
      const updatedItems = currentItems.filter((item) => item !== itemText);
      localStorage.setItem("shoppingItems", JSON.stringify(updatedItems));
      shoppingList.removeChild(itemDiv);
    }
  }
});

// -----------------hidelist implementation -------------------------------------

const hideList = document.getElementById("hide-list");
hideList.addEventListener("change", () => {
  if (hideList.checked) {
    shoppingList.style.display = "none";
  } else {
    shoppingList.style.display = "block";
  }
});


// ---------------------search items-------------------------------------------------

const searchInput = document.getElementById("search-item")

searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const allItems = shoppingList.querySelectorAll(".item");
    // console.log(allItems);
    allItems.forEach(item => {
      const itemName = item.querySelector(".item-name p").textContent.toLowerCase();
      if (itemName.includes(searchTerm)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });



  //------------------------generate random id ---------------------------------------

  function generateItemId() {
    return Math.random().toString(36).substr(2, 9);
  }

  console.log(generateItemId());