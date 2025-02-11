document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("saveForm").addEventListener("submit", addEmployee);
});

function addEmployee(event) {
    event.preventDefault();

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    let attuid = document.getElementById("attuid").value.trim();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phoneno = document.getElementById("phoneno").value.trim();
    let department = document.getElementById("department").value.trim();
    let manager = document.getElementById("manager").value.trim();
    let salary = document.getElementById("salary").value.trim();

    let attuidPattern = /^[A-Za-z]{2}\d{4}$/; // Two letters + 4 digits (e.g., AB1234)
    let emailPattern = /^[a-zA-Z0-9._%+-]+@att\.com$/; // Ends with .att.com

    if (!attuid.match(attuidPattern)) {
        alert("ATTUID must be in the format: Two alphabets followed by four numbers (e.g., AB1234)");
        return;
    }

    if (!email.match(emailPattern)) {
        alert("Email must end with '@att.com'");
        return;
    }

    if (employees.some(emp => emp.attuid === attuid)) {
        alert("ATTUID must be unique!");
        return;
    }
    if (employees.some(emp => emp.email === email)) {
        alert("Email must be unique!");
        return;
    }

    let newEmployee = { attuid, name, email, phoneno, department, manager, salary };
    employees.push(newEmployee);
    localStorage.setItem("employees", JSON.stringify(employees));

    alert("Employee added successfully!");
    location.href = "employees.html";
}
