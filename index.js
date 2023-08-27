let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
	slider.classList.add("moveslider");
	formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
	slider.classList.remove("moveslider");
	formSection.classList.remove("form-section-move");
});

// // Get the login button element
// const loginButton = document.querySelector('#LOGIN');

// // Add click event listener to the login button
// loginButton.addEventListener('click', () => {
//   // Get the email and password values from the input fields
//   alert('working');
//   const email = document.querySelector('.email').value;
//   const password = document.querySelector('.password').value;
// //   console.log(email);
// //   console.log(password);
//   // Create the request body object
//   const requestBody = {
//     email: email,
//     password: password
//   };

//   // Send the POST request using the Fetch API
//   fetch('/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(requestBody)
//   })
//     .then(response => {
//       if (response.ok) {
//         console.log('Login success');
//         window.location.href = 'success.html';
//         // Handle successful login
//       } else {
//         console.log('Login failed--');
//         // Handle login failure
//       }
//     })
//     .catch(error => {
//       console.error('Error during login:', error);
//       // Handle error during login
//     });
// });
// Get the signup button element
// Prevent navigating back by using the browser's back button




const signupButton = document.querySelector('#SIGN');

// Add click event listener to the signup button
signupButton.addEventListener('click', () => {
  // Get the form input values
  alert("signup button is clicked");
  const name = document.querySelector('.signup-name').value;
  const email = document.querySelector('.signup-email').value;
  const password = document.querySelector('.signup-password').value;
  const user = document.querySelector('.signup-user').value;


  // Set the input field values to default blank
  document.querySelector('.signup-name').value = '';
  document.querySelector('.signup-email').value = '';
  document.querySelector('.signup-user').value = '';
  document.querySelector('.signup-password').value='';
  // console.log(email);
  // console.log(password);
  // console.log(user);
  // Create the request body object
  const requestBody = {
    name:name,
    email: email,
    password: password,
    user: user
  };

  // Send the POST request using the Fetch API
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      if (response.ok) {
        console.log('Signup success');
        name.value="";
        user.value="";
        // Handle successful signup
      } else {
        console.log('Signup failed');
        // Handle signup failure
      }
    })
    .catch(error => {
      console.error('Error during signup:', error);
      // Handle error during signup
    });
});




// ... Your existing code ...

// Get the login button element
const loginButton = document.querySelector('#LOGIN');
const errorMessage = document.querySelector('.error-message'); // New error message element
errorMessage.style.display = 'none';
// Add click event listener to the login button
loginButton.addEventListener('click', () => {
    // Get the email and password values from the input fields
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    // Create the request body object
    const requestBody = {
        email: email,
        password: password
    };

    // Send the POST request using the Fetch API
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (response.ok) {
            console.log('Login success');
            return response.json();
        } else {
            console.log('Login failed');
            throw new Error('Login failed');
        }
    })
    .then(data => {
        if (data.user === 'Admin') {
            window.location.href = `/AdminDashboard/admin.html?name=${data.name}&email=${data.email}`;
        } else if (data.user === 'Student') {
            window.location.href = `/StudentDashboard/student.html?name=${data.name}&email=${data.email}`;
        }
    })
    .catch(error => {
      console.error('Error during login:', error);
      errorMessage.style.display = 'block'; // Show the error message
      document.querySelector('.email').value = ''; // Clear email input field
      document.querySelector('.password').value = ''; // Clear password input field
    });
});

// ... Rest of your existing code ...

// Get the login button element
// const loginButton = document.querySelector('#LOGIN');

// // Add click event listener to the login button
// loginButton.addEventListener('click', () => {
//   // Get the email and password values from the input fields
//   const email = document.querySelector('.email').value;
//   const password = document.querySelector('.password').value;

//   // Create the request body object
//   const requestBody = {
//     email: email,
//     password: password
//   };

//   // Send the POST request using the Fetch API
//   fetch('/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(requestBody)
//   })
//     .then(response => {
//       if (response.ok) {
//         console.log('Login success');
//         return response.json(); // Parse the response body as JSON
//       } else {
//         console.log('Login failed');
//         throw new Error('Login failed'); // Throw an error to be caught in the catch block
//       }
//     })
//     .then(data => {
//       // Check the user type and redirect accordingly
//       if (data.user === 'Admin') {
//         window.location.href = `/AdminDashboard/admin.html?name=${data.name}&email=${data.email}`;
//       } else if (data.user === 'Student') {
//         window.location.href = `/StudentDashboard/student.html?name=${data.name}&email=${data.email}`;
//       }
//     })
//     .catch(error => {
//       console.error('Error during login:', error);
//       // Handle error during login
//     });
// });

// Disable back navigation on index.html
window.history.pushState(null, '', window.location.href);
window.onpopstate = function(event) {
    window.history.pushState(null, '', window.location.href);
};

// Rest of your existing code...
// ... (signup, login event listeners, fetch requests, etc.)
