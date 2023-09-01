document.addEventListener('DOMContentLoaded', () => {
    const adminNameElement = document.getElementById('adminName');
    const adminEmailElement = document.getElementById('adminEmail');
  
    // Get user details from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const adminName = urlParams.get('name');
    const adminEmail = urlParams.get('email');
  
    adminNameElement.textContent = adminName;
    adminEmailElement.textContent = adminEmail;
});
document.getElementById('successMessage').style.display ='none';
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const newUserName = document.getElementById('newUserName').value;
      const newUserEmail = document.getElementById('newUserEmail').value;
      const newUserRole = document.getElementById('newUserRole').value;
  
      // Create the request body object
      const requestBody = {
        name: newUserName,
        email: newUserEmail,
        user: newUserRole,
      };
  
      // Send the POST request using the Fetch API to create a new user
      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
            if (response.ok) {
                document.getElementById('successMessage').style.display = 'block'; // Show the success message
                setTimeout(() => {
                  document.getElementById('successMessage').style.display = 'none'; // Hide the message after a few seconds
                }, 3000); // Adjust the duration as needed (3000ms = 3 seconds)
                
                // Clear form fields after successful creation
                document.getElementById('newUserName').value = '';
                document.getElementById('newUserEmail').value = '';
              } else {
                throw new Error('Error creating user');
              }
        })   
        .catch((error) => {
          console.error('Error creating user:', error);
        });
    });
  });
  const backToHomeButton = document.getElementById('backToHomeButton');
  backToHomeButton.addEventListener('click', () => {
    // Redirect to index.html
    window.location.href = '/index.html';
  });