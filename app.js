const apiBaseUrl = 'https://<api-id>.execute-api.<region>.amazonaws.com/prod/items';

// Create item (POST request)
document.getElementById('create-item-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = document.getElementById('item-id').value;
  const name = document.getElementById('item-name').value;
  const description = document.getElementById('item-description').value;

  const response = await fetch(apiBaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name, description }),
  });

  const data = await response.json();
  alert(data.message);  // Alert user on success
});

// Load item by ID (GET request)
document.getElementById('load-item-button').addEventListener('click', async () => {
  const itemId = prompt('Enter Item ID to load:');
  if (itemId) {
    const response = await fetch(`${apiBaseUrl}/${itemId}`);
    const data = await response.json();
    const output = document.getElementById('item-output');

    if (data.name) {
      output.innerHTML = `
        <strong>ID:</strong> ${data.id}<br>
        <strong>Name:</strong> ${data.name}<br>
        <strong>Description:</strong> ${data.description}
      `;
    } else {
      output.innerHTML = 'Item not found';
    }
  }
});

// Update item (PUT request)
document.getElementById('update-item-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = document.getElementById('update-id').value;
  const name = document.getElementById('update-name').value;
  const description = document.getElementById('update-description').value;

  const response = await fetch(`${apiBaseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description }),
  });

  const data = await response.json();
  alert(data.message); // Show success message
});

// Delete item (DELETE request)
document.getElementById('delete-item-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = document.getElementById('delete-id').value;

  const response = await fetch(`${apiBaseUrl}/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();
  alert(data.message); // Show success message
});
