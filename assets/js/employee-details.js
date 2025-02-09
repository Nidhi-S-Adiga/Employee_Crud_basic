document.addEventListener("DOMContentLoaded", async function () {
    let employees = JSON.parse(localStorage.getItem("employees")) || await fetchEmployees();
    
    const gridContainer = document.getElementById("employeeGridView");
    if (!gridContainer) return;
    gridContainer.innerHTML = "";

    if (employees.length === 0) {
        gridContainer.innerHTML = "<p class='no-data'>No data found!</p>";
        return;
    }

    let table = document.createElement("table");
    table.classList.add("employee-table");
    
    let thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
        </tr>
    `;
    table.appendChild(thead);
    
    let tbody = document.createElement("tbody");
    
    employees.forEach((emp) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.role}</td>
        `;
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    gridContainer.appendChild(table);
});
