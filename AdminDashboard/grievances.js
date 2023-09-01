// document.addEventListener('DOMContentLoaded', () => {
//     const params = new URLSearchParams(window.location.search);
//     const hostel = params.get('hostel');
//     const wing = params.get('wing');
//     const email=params.get('name');
//     const name=params.get('email');
//     console.log('Hostel:', hostel);
//     console.log('Wing:', wing);
//     document.getElementById('studentName').textContent = name;
//     document.getElementById('studentEmail').textContent = email;
//     fetchGrievances(hostel);
//   });
  
  

  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const hostel = params.get('hostel');
    const wing = params.get('wing');
    const issue = params.get('issue');
    const email = params.get('name');
    const name = params.get('email');
    console.log('Hostel:', hostel);
    console.log('Wing:', wing);
    console.log('Issue:', issue);
  
    document.getElementById('studentName').textContent = name;
    document.getElementById('studentEmail').textContent = email;
  
    fetchGrievances(hostel, wing, issue);
  });
  


  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const hostel = params.get('hostel');
    const wing = params.get('wing');
    const issue = params.get('issue');
    const name = params.get('name');
    const email = params.get('email');
    document.getElementById('studentName').textContent = name;
    document.getElementById('studentEmail').textContent = email;
    console.log(issue);
    console.log(wing); 
    fetchGrievances(hostel, wing, issue);
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutBtn');
    logoutButton.addEventListener('click', handleLogout);
  });
  
  function handleLogout(event) {
    event.preventDefault();
    const Name=document.getElementById('studentName').textContent;
    const Email=document.getElementById('studentEmail').textContent;
    const url = `admin.html?name=${encodeURIComponent(Name)}&email=${encodeURIComponent(Email)}`;
    window.location.href = url;
  }
  
  function fetchGrievances(hostel, wing, issue) {
    const url = `/grievances?hostel=${encodeURIComponent(hostel)}&wing=${encodeURIComponent(wing)}&issue=${encodeURIComponent(issue)}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch grievances');
        }
      })
      .then((grievances) => {
        const grievancesBody = document.getElementById('grievancesBody');
        grievancesBody.innerHTML = '';
        console.log(grievances);
        grievances.forEach((grievance) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${grievance.Id}</td>
            <td>${grievance.Name}</td>
            <td>${grievance.Hostel}</td>
            <td>${grievance.Wing}</td>
            <td>${grievance.Issue}</td>
            <td>${grievance.Description}</td>
            <td>
              <select class="status-select" data-grievance-id="${grievance._id}">
                <option value="Pending" ${grievance.Status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="Completed" ${grievance.Status === 'Completed' ? 'selected' : ''}>Completed</option>
              </select>
            </td>
          `;
          grievancesBody.appendChild(row);
        });
  //
        // Add event listener to status selects
        const statusSelects = document.querySelectorAll('.status-select');
        statusSelects.forEach((select) => {
          select.addEventListener('change', handleStatusChange);
        });
      })
      .catch((error) => {
        console.error('Error retrieving grievances:', error);
      });
  }
  
  function handleStatusChange(event) {
    const grievanceId = event.target.dataset.grievanceId;
    const newStatus = event.target.value;
    const requestBody = {
      status: newStatus
    };
    fetch(`/grievances/${grievanceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then((response) => {
        if (response.ok) {
          console.log('Grievance status updated successfully');
        } else {
          console.log('Failed to update grievance status');
        }
      })
      .catch((error) => {
        console.error('Error during grievance status update:', error);
      });
  }
  
  
  // function fetchGrievances(hostel) {
  //   const url = `/grievances?hostel=${encodeURIComponent(hostel)}`;
  //   fetch(url)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error('Failed to fetch grievances');
  //       }
  //     })
  //     .then((grievances) => {
  //       const grievancesBody = document.getElementById('grievancesBody');
  //       grievancesBody.innerHTML = '';
  //       console.log(grievances);
  //       grievances.forEach((grievance) => {
  //         const row = document.createElement('tr');
  //         row.innerHTML = `
  //           <td>${grievance.Id}</td>
  //           <td>${grievance.Name}</td>
  //           <td>${grievance.Hostel}</td>
  //           <td>${grievance.Wing}</td>
  //           <td>${grievance.Issue}</td>
  //           <td>${grievance.Description}</td>
  //           <td>
  //             <select class="status-select" data-grievance-id="${grievance._id}">
  //               <option value="Pending" ${grievance.Status === 'Pending' ? 'selected' : ''}>Pending</option>
  //               <option value="Accepted" ${grievance.Status === 'Accepted' ? 'selected' : ''}>Accepted</option>
  //             </select>
  //           </td>
  //         `;
  //         grievancesBody.appendChild(row);
  //       });
  
  //       // Add event listener to status selects
  //       const statusSelects = document.querySelectorAll('.status-select');
  //       statusSelects.forEach((select) => {
  //         select.addEventListener('change', handleStatusChange);
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Error retrieving grievances:', error);
  //     });
  // }
  
  // function handleStatusChange(event) {
  //   const grievanceId = event.target.dataset.grievanceId;
  //   const newStatus = event.target.value;
  //   const requestBody = {
  //     status: newStatus
  //   };
  //   fetch(`/grievances/${grievanceId}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(requestBody)
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log('Grievance status updated successfully');
  //       } else {
  //         console.log('Failed to update grievance status');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error during grievance status update:', error);
  //     });
  // }
  