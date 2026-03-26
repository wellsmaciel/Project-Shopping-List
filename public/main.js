// Add event listener to the submit button
document.getElementById('list-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const shop_item = document.getElementById('item').value;
  const qtd = document.getElementById('quantity').value;
  if (!shop_item || !qtd) {
    alert('Please fill both fields.');
  } else {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const text = document.createTextNode(`${shop_item} - Quantity: ${qtd}`);
    const list = document.getElementById('result');
    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('img');

    // Element setup
    checkbox.type = 'checkbox';
    deleteIcon.src = '/public/images/trash light.png';
    deleteIcon.alt = 'Remove item';
    deleteIcon.className = 'delete-icon';
    deleteButton.className = 'delete-button';

    // Append elements
    deleteButton.appendChild(deleteIcon);
    listItem.appendChild(checkbox);
    listItem.appendChild(text);
    listItem.appendChild(deleteButton);
    list.appendChild(listItem);

    // Delete item event listener
    deleteButton.addEventListener('click', function () {
      list.removeChild(listItem);
    });
  }
});

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
  const addedList = document.getElementById('result');
  const addedItems = document.getElementById('addedItems');
  const deleteListbtn = document.createElement('button');
  deleteListbtn.className = 'delete-list-button';
  deleteListbtn.textContent = 'Clear List';
  addedItems.appendChild(deleteListbtn);

  deleteListbtn.addEventListener('click', function () {
    while (addedList.firstChild) {
      addedList.removeChild(addedList.firstChild);
    }
  });
}

/*function createItem(itemData) {
  fetch('http://localhost:3000/api/v2/shopping_list', {
}*/

function updateItem(id, updatedData) {
  fetch(`http://localhost:3000/api/v2/shopping_list/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      RenderGroceryList();
    });
}

function deleteItem(id) {
  fetch(`http://localhost:3000/api/v2/shopping_list/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      RenderGroceryList();
    });
}

// Fetch and render grocery list from the server
function RenderGroceryList() {
  fetch('http://localhost:3000/api/v2/shopping_list')
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById('result'); // Clear existing list items

      list.innerHTML = '';

      data.forEach((item) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        const text = document.createTextNode(`${item.item_name} - ${item.unit_type} - Quantity: ${item.quantity} - `);
        const deleteButton = document.createElement('button');
        const deleteIcon = document.createElement('img');
        const updatebtn = document.createElement('button');

        checkbox.type = 'checkbox';
        deleteIcon.src = '/images/trash light.png';
        deleteIcon.alt = 'Remove item';
        deleteIcon.className = 'delete-icon';
        deleteButton.className = 'delete-button';
        updatebtn.className = 'update-button';
        updatebtn.textContent = 'Update';

        deleteButton.appendChild(deleteIcon);
        listItem.appendChild(checkbox);
        listItem.appendChild(text);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
        listItem.appendChild(updatebtn);

        deleteButton.addEventListener('click', function () {
          deleteItem(item.id);
        });

        updatebtn.addEventListener('click', function () {
          const updatedData = {
            item_name: prompt('Enter new item name:', item.item_name),
            unit_type: prompt('Enter new unit type:', item.unit_type),
            quantity: parseInt(prompt('Enter new quantity:', item.quantity)),
          };
          if (Number.isNaN(updatedData.quantity) || updatedData.quantity <= 0) {
            alert(`${updatedData.quantity} is not a valid Number`);
          } else {
            (updateItem(item.id, updatedData), alert('Item updated successfully!'));
          }
        });
      });
    });
}
RenderGroceryList();
//
