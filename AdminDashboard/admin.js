// // Sample grievance data for demonstration
// var grievances = [
//     { studentId: 1, subject: "Issue 1", description: "Description 1", status: "Open" },
//     { studentId: 2, subject: "Issue 2", description: "Description 2", status: "Closed" },
//     { studentId: 3, subject: "Issue 3", description: "Description 3", status: "Open" }
// ];

// // Function to populate the grievances table
// function populateGrievancesTable() {
//     var tableBody = document.getElementById("grievancesTable").getElementsByTagName("tbody")[0];

//     // Clear existing table rows
//     tableBody.innerHTML = "";

//     // Populate the table with grievance data
//     for (var i = 0; i < grievances.length; i++) {
//         var row = tableBody.insertRow();
//         var studentIdCell = row.insertCell(0);
//         var subjectCell = row.insertCell(1);
//         var descriptionCell = row.insertCell(2);
//         var statusCell = row.insertCell(3);

//         studentIdCell.innerHTML = grievances[i].studentId;
//         subjectCell.innerHTML = grievances[i].subject;
//         descriptionCell.innerHTML = grievances[i].description;

//         // Create a dropdown element for the status field
//         var statusDropdown = document.createElement("select");
//         statusDropdown.innerHTML = `
//       <option value="Pending" ${grievances[i].status === "Pending" ? "selected" : ""}>Pending</option>
//       <option value="Solved" ${grievances[i].status === "Solved" ? "selected" : ""}>Solved</option>
//     `;

//         // Add event listener to update the status value and cell color on change
//         statusDropdown.addEventListener("change", function(event) {
//             grievances[i].status = event.target.value;
//             updateStatusCellColor(event.target.parentNode.parentNode, event.target.value);
//         });

//         // Append the dropdown to the status cell
//         statusCell.appendChild(statusDropdown);

//         // Update the status cell color based on the initial status value
//         updateStatusCellColor(row, grievances[i].status);
//     }
// }

// // Function to update the color of the status cell based on the selected status
// function updateStatusCellColor(row, status) {
//     if (status === "Pending") {
//         row.classList.add("pending-status");
//         row.classList.remove("solved-status");
//     } else if (status === "Solved") {
//         row.classList.add("solved-status");
//         row.classList.remove("pending-status");
//     } else {
//         row.classList.remove("pending-status");
//         row.classList.remove("solved-status");
//     }
// }

// // Call the populateGrievancesTable function on page load
// populateGrievancesTable();

// // Logout button event listener
// document.getElementById("logoutBtn").addEventListener("click", function() {
//     // Perform logout actions here

//     // Redirect to login page
//     window.location.href = "login.html";
// });


document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const email = params.get('email');
   
    document.getElementById('adminName').textContent = name;
    document.getElementById('adminEmail').textContent = email;
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const viewGrievancesButton = document.getElementById('viewGrievancesBtn');
    viewGrievancesButton.addEventListener('click', handleViewGrievances);
  });
  
  function handleViewGrievances(event) {
    event.preventDefault();
    const hostel = document.getElementById('hostelSelect').value;
    const wing = document.getElementById('wingSelect').value;
    const issue = document.getElementById('IssueSelect').value;
    const Name=document.getElementById('adminName').textContent;
    const Email=document.getElementById('adminEmail').textContent;
    const url = `grievances.html?hostel=${encodeURIComponent(hostel)}&wing=${encodeURIComponent(wing)}&name=${encodeURIComponent(Name)}&email=${encodeURIComponent(Email)}&issue=${encodeURIComponent(issue)}`;
    window.location.href = url;
  }
  
   document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutBtn');
    logoutButton.addEventListener('click', handleLogout);
  });
  
  function handleLogout(event) {
    event.preventDefault();
    window.location.href = '/index.html';
  }