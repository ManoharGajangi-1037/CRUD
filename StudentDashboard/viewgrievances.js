document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const email = params.get('email');
  
    document.getElementById('studentName').textContent = name;
    document.getElementById('studentEmail').textContent = email;
  
    fetch(`/get-grievances?name=${encodeURIComponent(name)}`)
      .then(response => response.json())
      .then(data => {
        const grievancesBody = document.getElementById('grievancesBody');
        data.forEach(grievance => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${grievance.Name}</td>
            <td>${grievance.Hostel}</td>
            <td>${grievance.Wing}</td>
            <td>${grievance.Issue}</td>
            <td>${grievance.Description}</td>
            <td>${grievance.Status}</td>
          `;
          grievancesBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching grievances:', error);
      });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutBtn');
    logoutButton.addEventListener('click', handleLogout);
  });
  
  function handleLogout(event) {
    event.preventDefault();
    const name = document.getElementById('studentName').textContent;
    const email = document.getElementById('studentEmail').textContent;
    const url = `/StudentDashboard/student.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
    window.location.href = url;
  }
  