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
    deleteIcon.src = '/images/trash light.png';
    deleteIcon.alt = 'Excluir item';
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
