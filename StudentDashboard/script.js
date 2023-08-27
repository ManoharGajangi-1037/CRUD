document.addEventListener('DOMContentLoaded', () => {
    const grievanceForm = document.getElementById('grievanceForm');
    grievanceForm.addEventListener('submit', handleGrievanceSubmission);
  });
  
  function handleGrievanceSubmission(event) {
    event.preventDefault();
    alert("yes working");
    const idInput = document.getElementById('id');
    const nameInput = document.getElementById('id-name');
    const hostelInput = document.getElementById('hostel');
    const wingInput = document.getElementById('wing');
    const issueInput = document.getElementById('issue');
    const descriptionInput = document.getElementById('description');
  
    const id = idInput.value;
    const name = nameInput.value;
    const hostel = hostelInput.value;
    const wing = wingInput.value;
    const issue = issueInput.value;
    const description = descriptionInput.value;
  
    const grievanceData = {
      id: id,
      name: name,
      hostel: hostel,
      wing: wing,
      issue: issue,
      description: description
    };
  
    fetch('/submit-grievance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(grievanceData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Grievance submitted successfully');
          // Clear the form
          idInput.value = '';
          nameInput.value = '';
          hostelInput.value = '';
          wingInput.value = '';
          issueInput.value = '';
          descriptionInput.value = '';
        } else {
          console.log('Failed to submit grievance');
        }
      })
      .catch(error => {
        console.error('Error during grievance submission:', error);
      });
  }
  

  document.addEventListener('DOMContentLoaded', ()=> {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const email = params.get('email');
    document.getElementById('studentName').textContent = name;
    document.getElementById('studentEmail').textContent = email;
    const nameInput = document.getElementById('id-name');
    nameInput.value = name;
  });

  document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutBtn');
    logoutButton.addEventListener('click', handleLogout);
  });
  
  function handleLogout(event) {
    event.preventDefault();
    window.location.href = '/index.html';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const viewGrievancesButton = document.getElementById('viewGrievancesBtn');
    viewGrievancesButton.addEventListener('click', handleViewGrievances);
  });
  
  function handleViewGrievances(event) {
    event.preventDefault();
    const name = document.getElementById('studentName').textContent;
    const email = document.getElementById('studentEmail').textContent;
    const url = `viewgrievances.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
    window.location.href = url;
  }
  
  
  
