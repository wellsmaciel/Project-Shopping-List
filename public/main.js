// Theme Toggle
{
  const themeButton = document.getElementById('theme-button');
  const htmlFile = document.documentElement;

  themeButton.addEventListener('click', function () {
    let currentTheme = htmlFile.getAttribute('color-mode');

    if (currentTheme === 'light') {
      htmlFile.setAttribute('color-mode', 'dark');
    } else {
      htmlFile.setAttribute('color-mode', 'light');
    }
  });
}

// Clear List Button
{
  const addedItems = document.getElementById('addedItems');
  const deleteListbtn = document.createElement('button');
  deleteListbtn.className = 'delete-list-button';
  deleteListbtn.textContent = 'Clear List';
  addedItems.appendChild(deleteListbtn);

  deleteListbtn.addEventListener('click', function () {
    clearList();
  });
}

// API interaction functions

// Handle form submission to add new item
document.getElementById('list-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const shop_item = document.getElementById('item').value;
  const qtd = document.getElementById('quantity').value;
  const unit = document.getElementById('itemType').value;

  if (!shop_item || !unit || Number.isNaN(parseInt(qtd, 10)) || parseInt(qtd, 10) <= 0) {
    alert('All fields are required and quantity must be a valid number(cannot be empty, zero or negative)');
    return;
  }

  const itemData = {
    item_name: shop_item,
    quantity: parseInt(qtd, 10),
    unit_type: unit,
  };

  createItem(itemData);
});

//Create new item
function createItem(itemData) {
  fetch('/api/v2/shopping_list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data, 'Item added successfully');
      alert('Item added successfully!');
      RenderGroceryList();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while adding the item. Please try again.');
    });
}
//Update existing item
function updateItem(id, updatedData) {
  fetch(`/api/v2/shopping_list/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data, 'Item updated successfully');
      RenderGroceryList();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while updating the item. Please try again.');
    });
}
//Delete item
function deleteItem(id) {
  fetch(`/api/v2/shopping_list/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data, 'Item deleted successfully');
      alert('Item deleted successfully!');
      RenderGroceryList();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while deleting the item. Please try again.');
    });
}

//Clear entire list
function clearList() {
  fetch('/api/v2/shopping_list/', {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data, 'Grocery list cleared successfully');
      alert('Grocery list cleared successfully!');
      RenderGroceryList();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while deleting all items. Please try again.');
    });
}

// Fetch and render grocery list from the server
function RenderGroceryList() {
  fetch('/api/v2/shopping_list')
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById('result'); // Clear existing list items

      list.innerHTML = '';

      data.forEach((item) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        const itemtext = document.createTextNode(`${item.item_name}`);
        const itemDetails = document.createTextNode(`${item.quantity} -  ${item.unit_type}`);
        const updatebtn = document.createElement('button');
        const deleteButton = document.createElement('button');
        const groceryContainer = document.createElement('div');
        const itemtextContainer = document.createElement('div');
        const itemDetailsContainer = document.createElement('div');
        const checkboxContainer = document.createElement('div');
        const btnsContainer = document.createElement('div');

        checkbox.type = 'checkbox';
        checkboxContainer.className = 'checkbox-container';
        groceryContainer.className = 'grocery-item';
        btnsContainer.className = 'buttons-container';
        updatebtn.className = 'update-button';
        updatebtn.textContent = 'Update';
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        itemDetailsContainer.className = 'item-details';
        itemtextContainer.className = 'item-text';

        checkboxContainer.appendChild(checkbox);
        listItem.appendChild(checkboxContainer);
        groceryContainer.appendChild(itemtextContainer);
        groceryContainer.appendChild(itemDetailsContainer);
        listItem.appendChild(groceryContainer);
        itemtextContainer.appendChild(itemtext);
        itemDetailsContainer.appendChild(itemDetails);
        list.appendChild(listItem);
        btnsContainer.appendChild(updatebtn);
        btnsContainer.appendChild(deleteButton);
        listItem.appendChild(btnsContainer);

        deleteButton.addEventListener('click', function () {
          deleteItem(item.id);
        });

        updatebtn.addEventListener('click', function () {
          let newItem = prompt('Enter new item name:', item.item_name);
          let newUnitType = prompt('Enter new unit type:', item.unit_type);
          let newQuantity = parseInt(prompt('Enter new quantity:', item.quantity), 10);
          if (!newItem || !newUnitType || Number.isNaN(newQuantity) || newQuantity <= 0) {
            alert('All fields are required and quantity must be a valid number(cannot be empty, zero or negative)');
          } else {
            const updatedData = {
              item_name: newItem,
              unit_type: newUnitType,
              quantity: newQuantity,
            };
            updateItem(item.id, updatedData);
          }
        });
      });
    });
}
RenderGroceryList();
//
