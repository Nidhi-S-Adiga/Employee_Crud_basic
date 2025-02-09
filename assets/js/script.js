document.addEventListener("DOMContentLoaded", async function () {
    let employees = JSON.parse(localStorage.getItem("employees")) || await fetchEmployees();
    
    function updateEmployeeGrid() {
        const gridContainer = document.getElementById("employeeGrid");
        if (!gridContainer) return;
        gridContainer.innerHTML = "";

        if (employees.length === 0) {
            gridContainer.innerHTML = "<p class='no-data'>No data found!</p>";
            return;
        }

        let table = document.createElement("table");
        table.classList.add("employee-table");
        
        // Create table header
        let thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
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
                <td>
                    <button class="edit-btn" data-id="${emp.id}">Edit</button>
                    <button class="delete-btn" data-id="${emp.id}">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        gridContainer.appendChild(table);
        
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function () {
                let empId = parseInt(this.getAttribute("data-id"));
                location.href = `edit-employee.html?id=${empId}`;
            });
        });
        
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                let empId = parseInt(this.getAttribute("data-id"));
                if (confirm("Are you sure you want to delete this employee?")) {
                    deleteEmployee(empId);
                }
            });
        });
    }

    function editEmployee() {
        const urlParams = new URLSearchParams(window.location.search);
        const empId = parseInt(urlParams.get("id"));
        let employee = employees.find(emp => emp.id === empId);

        if (employee) {
            document.getElementById("name").value = employee.name;
            document.getElementById("role").value = employee.role;
            
            document.getElementById("editForm").addEventListener("submit", function (event) {
                event.preventDefault();
                employee.name = document.getElementById("name").value;
                employee.role = document.getElementById("role").value;
                saveEmployeesToLocalStorage(employees);
                updateEmployeeGrid();
                location.href = "employees.html";
            });
        }
    }

    async function fetchEmployees() {
        try {
            const response = await fetch('../assets/data/employees.json');
            const employees = await response.json();
            localStorage.setItem("employees", JSON.stringify(employees));
            return employees;
        } catch (error) {
            console.error('Error fetching employee data:', error);
            return [];
        }
    }

    function saveEmployeesToLocalStorage(updatedEmployees) {
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    }

    function addEmployee(event) {
        event.preventDefault();
        let name = document.getElementById("name").value;
        let role = document.getElementById("role").value;
        let newId = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
        employees.push({ id: newId, name, role });
        saveEmployeesToLocalStorage(employees);
        updateEmployeeGrid();
        location.href = "employees.html";
    }

    function deleteEmployee(id) {
        employees = employees.filter(emp => emp.id !== id);
        saveEmployeesToLocalStorage(employees);
        updateEmployeeGrid();
    }

    if (document.getElementById("saveForm")) {
        document.getElementById("saveForm").addEventListener("submit", addEmployee);
    }
    
    if (document.getElementById("editForm")) {
        editEmployee();
    }

    // Add Back to Home Button
    let backButton = document.createElement("button");
    backButton.textContent = "Back to Home";
    backButton.classList.add("back-btn");
    backButton.addEventListener("click", function () {
        location.href = "../index.html";
    });
    document.body.appendChild(backButton);

    updateEmployeeGrid();
});