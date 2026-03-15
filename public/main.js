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
    const text = document.createTextNode(`${shop_item} - Quantity: ${qtd} - `);
    const list = document.getElementById('result');
    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('img');

    checkbox.type = 'checkbox';
    listItem.appendChild(checkbox);
    listItem.appendChild(text);
    list.appendChild(listItem);
    deleteIcon.src = 'images/trash light.png';
    deleteButton.appendChild(deleteIcon);
    deleteIcon.alt = 'Delete';
    deleteIcon.classList.add('delete-icon');
    listItem.appendChild(deleteButton);

    document.getElementById('item').value = '';
    document.getElementById('quantity').value = '';
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
