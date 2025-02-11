document.addEventListener("DOMContentLoaded", function () {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
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
            <th>ATTUID</th>
            <th>Name</th>
            <th>Email</th>
            <th>View</th>
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
                <button class="view-btn" data-id="${emp.attuid}">View</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    gridContainer.appendChild(table);

    document.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", function () {
            let empId = this.getAttribute("data-id");
            let employee = employees.find(emp => emp.attuid === empId);
            if (employee) {
                showEmployeeDetails(employee);
            }
        });
    });

    document.getElementById("closeModal").addEventListener("click", function () {
        document.getElementById("detailsModal").style.display = "none";
    });
});

function showEmployeeDetails(employee) {
    document.getElementById("modal-attuid").innerText = employee.attuid;
    document.getElementById("modal-name").innerText = employee.name;
    document.getElementById("modal-email").innerText = employee.email;
    document.getElementById("modal-phoneno").innerText = employee.phoneno;
    document.getElementById("modal-department").innerText = employee.department;
    document.getElementById("modal-manager").innerText = employee.manager;
    document.getElementById("modal-salary").innerText = employee.salary;

    document.getElementById("detailsModal").style.display = "block";
}
