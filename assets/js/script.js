document.addEventListener("DOMContentLoaded", function () {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];

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

        let thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>ATTUID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        `;
        table.appendChild(thead);

        let tbody = document.createElement("tbody");

        employees.forEach((emp) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${emp.attuid}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>
                    <button onclick="location.href='edit-employee.html?attuid=${emp.attuid}'">Edit</button>
                    <button class="delete-btn" data-id="${emp.attuid}">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        gridContainer.appendChild(table);

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                let empId = this.getAttribute("data-id");
                if (confirm("Are you sure you want to delete this employee?")) {
                    employees = employees.filter(emp => emp.attuid !== empId);
                    localStorage.setItem("employees", JSON.stringify(employees));
                    updateEmployeeGrid();
                }
            });
        });
    }

    updateEmployeeGrid();
});
