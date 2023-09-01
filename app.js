// Import dependencies
const express =require('express');
const mongoose =require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser =require('body-parser');

//Create an instance of the express application
const app = express();
app.use(express.static('public'));
app.use(express.static(__dirname));
//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Your routes...
//Connect to MongoDB
//mongodb://localhost:27017
mongoose.connect('mongodb://localhost:27017/dorm', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a Mongoose schema for the registrations
const registrationSchema = new mongoose.Schema({
  name:String,
  email: String,
  password: String,
  user:String,
  // usertype:String
});

// Create a Mongoose model for the registrations
const Registration = mongoose.model('Registration', registrationSchema);


const querySchema = new mongoose.Schema({
  Id: String,
  Name: String,
  Hostel: String,
  Wing: String,
  Issue: String,
  Description: String,
  Status: String
});

// Create a Mongoose model for the queries
const Query = mongoose.model('Query', querySchema);

// Handle the grievance submission POST request
app.post('/submit-grievance', (req, res) => {
  // Get the data from the request body
  const id = req.body.id;
  const name = req.body.name;
  const hostel = req.body.hostel;
  const wing = req.body.wing;
  const issue = req.body.issue;
  const description = req.body.description;

  // Create a new query document
  const query = new Query({
    Id: id,
    Name: name,
    Hostel: hostel,
    Wing: wing,
    Issue: issue,
    Description: description,
    Status: 'Pending'
  });

  // Save the query to the database
  query.save()
    .then(() => {
      console.log('Query saved:', query);
      res.sendStatus(200); // Send a success response
    })
    .catch((error) => {
      console.error('Error saving query:', error);
      res.sendStatus(500); // Send an error response
    });
});



// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  // app.post('/signup', (req, res) => {
  //   // Get the data from the request body
  //   const name =req.body.name;
  //   const email = req.body.email;
  //   const password = req.body.password;
  //   const user = req.body.user;
  //   console.log(name);
  //   console.log(email);
  //   // Create a new registration document
  //   const registration = new Registration({
  //     name :name,
  //     email: email,
  //     password: password,
  //     user: user
  //   });
  
  //   // Save the registration to the database
  //   registration.save()
  //     .then(() => {
  //       console.log('Registration saved:', registration);
  //       res.sendStatus(200); // Send a success response
  //     })
  //     .catch((error) => {
  //       console.error('Error saving registration:', error);
  //       res.sendStatus(500); // Send an error response
  //     });
  // });
  


//   app.post('/signup', (req, res) => {
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;
//     const user = req.body.user;

//     // Check if the email ends with "@rgukt.ac.in" or "@gmail.com"
//     const isRguktEmail = email.endsWith('@rgukt.ac.in');
//     const isGmailEmail = email.endsWith('@gmail.com');

//     if (!isRguktEmail && !isGmailEmail) {
//       return res.status(400).send('Invalid email format');
//     }

//     // Check if the user is either "Admin" or "Student"
//     if (user !== 'Admin' && user !== 'Student') {
//       return res.status(400).send('Invalid email format');
//     }
//     // Create a new registration document
//     const registration = new Registration({
//         name: name,
//         email: email,
//         password: password,
//         user: user
//     });

//     // Save the registration to the database
//     registration.save()
//         .then(() => {
//             console.log('Registration saved:', registration);
//             res.sendStatus(200); // Send a success response
//         })
//         .catch((error) => {
//             console.error('Error saving registration:', error);
//             res.sendStatus(500); // Send an error response
//         });
// });



app.post('/signup', async (req, res) => {
  const { name, email,user} = req.body;
  // console.log("reached here");
  // Generate a random password if it's not provided
  const generatedPassword =generateRandomPassword();

  try {
    // Check if a user with the same email already exists
    const existingUser = await Registration.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    // Create a new registration document
    const registration = new Registration({
      name,
      email,
      password: generatedPassword,
      user,
    });

    // Save the registration to the database
    await registration.save();

    // Send the generated password as an email to the user
    sendPasswordEmail(email, generatedPassword);

    res.sendStatus(200); // Send a success response
  } catch (error) {
    console.error('Error during user registration:', error);
    res.sendStatus(500); // Send an error response
  }
});

// Function to generate a random password
function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const passwordLength = 8;
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}

// Function to send the password as an email to the user
function sendPasswordEmail(to, password) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Change this to your email service provider
    auth: {
      user: 'b181166@rgukt.ac.in', // Your email address
      pass: '9701583782', // Your email password or app-specific password
    },
  });

  const mailOptions = {
    from: 'b181166@rgukt.ac.in', // Your email address
    to,
    subject: 'Your Account Password',
    text: `Your account password is: ${password}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Password email sent:', info.response);
    }
  });
}

  app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
     console.log(email);
     console.log(password);
    // Find a registration document with the given email and password
    Registration.findOne({ email, password })
      .then((registration) => {
        if (registration) {
          // Email and password match, login success
          console.log('Login success');
          res.status(200).json({ name: registration.name, user: registration.user ,email:registration.email}); // Send the name and user type as response
        } else {
          // Email and password do not match, login failed
          console.log('Login failed');
          res.sendStatus(500);
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        res.sendStatus(500); // Send an error response
      });
  });



  app.post('/change-password', async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
  
    try {
      // Find the user by email
      const user = await Registration.findOne({ email }).exec();
  
      // Check if the current password matches
      if (user && user.password === currentPassword) {
        // Update the password with the new one
        user.password = newPassword;
        await user.save();
  
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false, message: 'Invalid current password' });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      res.sendStatus(500); // Send an error response
    }
  });
  
  app.get('/get-grievances', (req, res) => {
    const name = req.query.name;
  
    Query.find({ Name: name })
      .sort({ Status: 1, _id: -1 }) // Sort by Status in ascending order and _id in descending order
      .exec()
      .then(grievances => {
        const pendingGrievances = grievances.filter(grievance => grievance.Status === 'Pending');
        const acceptedGrievances = grievances.filter(grievance => grievance.Status === 'Completed');
        const sortedGrievances = pendingGrievances.concat(acceptedGrievances);
        res.status(200).json(sortedGrievances);
      })
      .catch(error => {
        console.error('Error retrieving grievances:', error);
        res.sendStatus(500);
      });
  });

  // app.get('/grievances', (req, res) => {
  //   const { hostel } = req.query;
  
  //   Query.find({ Hostel: hostel })
  //     .sort({ Status: -1, _id: -1 })
  //     .exec()
  //     .then((grievances) => {
  //       res.status(200).json(grievances);
  //     })
  //     .catch((error) => {
  //       console.error('Error retrieving grievances:', error);
  //       res.sendStatus(500);
  //     });
  // });
  app.get('/grievances', (req, res) => {
    const { hostel, wing, issue } = req.query;
    console.log(hostel);
    console.log(wing);
    console.log(issue);
    const query = { Hostel: hostel, Wing: wing, Issue: issue };
    Query.find(query)
      .sort({ Status: -1, _id: -1 })
      .exec()
      .then((grievances) => {
        res.status(200).json(grievances);
      })
      .catch((error) => {
        console.error('Error retrieving grievances:', error);
        res.sendStatus(500);
      });
  });
  

  // app.put('/grievances/:id', (req, res) => {
  //   const { id } = req.params;
  //   const { status } = req.body;
  
  //   Query.findByIdAndUpdate(id, { Status: status }, { new: true })
  //     .exec()
  //     .then(updatedGrievance => {
  //       res.status(200).json(updatedGrievance);
  //     })
  //     .catch(error => {
  //       console.error('Error updating grievance status:', error);
  //       res.sendStatus(500);
  //     });
  // });



// Update the PUT endpoint for updating grievance status to include email sending functionality:
// app.put('/grievances/:id', async (req, res) => {
//   const { id } = req.params;
//   const { status, name } = req.body;

//   try {
//       console.log("came here");
//       // console.log(name);
//       const updatedGrievance = await Query.findByIdAndUpdate(id, { Status: status }, { new: true }).exec();

//       // Send email when the issue is marked as completed
//       // if (status === 'Completed') {   
//           const user = await Registration.findOne({ name }).exec();
//           // if (user) {
//           //   console.log("sending");
//               sendEmailToUser('gajangimanohar@gmail.com', 'Your issue has been resolved', 'Your issue has been marked as resolved. Thank you for using our portal.');
//           // }
//       // }

//       res.status(200).json(updatedGrievance);
//   } catch (error) {
//       console.error('Error updating grievance status:', error);
//       res.sendStatus(500);
//   }
// });

// // Rest of the code...




app.put('/grievances/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Update the grievance status
    const updatedGrievance = await Query.findByIdAndUpdate(id, { Status: status }, { new: true }).exec();
    // Retrieve the grievance document to get the associated name
    const grievance = await Query.findById(id).exec();
    const name = grievance.Name;
    console.log(name);
    console.log(grievance.Status);
    // Send email when the issue is marked as completed
     if (grievance.Status === 'Completed') {
      const user = await Registration.findOne({ name }).exec();
      if (user) {
        sendEmailToUser(user.email, 'Your issue has been resolved', 'Your issue has been marked as resolved. Thank you for using our portal.');
      }
     }

    res.status(200).json(updatedGrievance);
  } catch (error) {
    console.error('Error updating grievance status:', error);
    res.sendStatus(500);
  }
});

// Function to send an email using Nodemailer
function sendEmailToUser(to, subject, text) {
  const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail'
      auth: {
          user: 'b181166@rgukt.ac.in', // Your email
          pass: '9701583782' // Your password
      }
  });

  const mailOptions = {
      from: 'b181166@rgukt.ac.in', // Your email
      to: to,
      subject: subject,
      text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
      } else {
          console.log('Email sent:', info.response);
      }
  });
}



// Add a new endpoint to handle password recovery
app.post('/forgot-password', async (req, res) => {
  const { name, email, user } = req.body;
  console.log("came here");
  try {
    // Find the user with the provided name, email, and user type
    const userRecord = await Registration.findOne({ name, email, user }).exec();
   
    if (userRecord) {
      console.log("found");
      // Send the password to the user's email
      const password = userRecord.password;
      sendEmailtoUser(email, 'Password Recovery', `Your password is: ${password}`);
      res.sendStatus(200); // Password sent successfully
    } else {
      res.sendStatus(404); // User not found
    }
  } catch (error) {
    console.error('Error during password recovery:', error);
    res.sendStatus(500); // Internal server error
  }
});


function sendEmailtoUser(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to your email service provider
    auth: {
      user: 'b181166@rgukt.ac.in', // Your email
      pass: '9701583782' // Your password or app-specific password
    }
  });

  const mailOptions = {
    from: 'b181166@rgukt.ac.in', // Your email
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// const mongoose = require('mongoose');
// const Registration = mongoose.model('Registration'); // Assuming you have defined the Registration model as shown in your code


// Start the server
app.listen(4000, () => {
  console.log('Server started on port 4000');
});
