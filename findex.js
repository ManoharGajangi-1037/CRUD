const submitButton = document.querySelector('.submit-btn');
const backButton = document.querySelector('.back-btn');
const recoveryFeedback = document.querySelector('.recovery-feedback');

submitButton.addEventListener('click', () => {

  // Retrieve the entered details (name, email, user type)
  const name = document.querySelector('.name').value;
  const email = document.querySelector('.email').value;
  const user = document.querySelector('.user').value;
  console.log(name);
  console.log(email);
  console.log(user);
  // Create a request object and send it to the server
  const requestBody = {
    name: name,
    email: email,
    user: user
  };

  // Send the POST request to the server for password recovery
  fetch('/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    if (response.ok) {
      recoveryFeedback.textContent = 'Password sent to your corresponding email.';
      recoveryFeedback.style.color = 'green';
    } else {
      recoveryFeedback.textContent = 'You have entered invalid details.';
      recoveryFeedback.style.color = 'red';
    }
  })
  .catch(error => {
    recoveryFeedback.textContent = 'An error occurred during recovery.';
    recoveryFeedback.style.color = 'red';
  });
});

backButton.addEventListener('click', () => {
  // Navigate back to the login page
//   alert("clicker");
  window.location.href = 'index.html';
});
