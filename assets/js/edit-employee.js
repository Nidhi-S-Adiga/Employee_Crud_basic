document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const attuid = urlParams.get("attuid");

    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    let employee = employees.find(emp => emp.attuid === attuid);

    if (employee) {
        document.getElementById("attuid").value = employee.attuid;
        document.getElementById("name").value = employee.name;
        document.getElementById("email").value = employee.email;
        document.getElementById("phoneno").value = employee.phoneno;
        document.getElementById("department").value = employee.department;
        document.getElementById("manager").value = employee.manager;
        document.getElementById("salary").value = employee.salary;

        document.getElementById("editForm").addEventListener("submit", function (event) {
            event.preventDefault();

            let updatedName = document.getElementById("name").value;
            let updatedEmail = document.getElementById("email").value;
            let updatedPhoneno = document.getElementById("phoneno").value;
            let updatedDepartment = document.getElementById("department").value;
            let updatedManager = document.getElementById("manager").value;
            let updatedSalary = document.getElementById("salary").value;

            let emailPattern = /^[a-zA-Z0-9._%+-]+@att\.com$/;

            if (!updatedEmail.match(emailPattern)) {
                alert("Email must end with '@att.com'");
                return;
            }

            // Check if the new email already exists in another employee
            let emailExists = employees.some(emp => emp.email === updatedEmail && emp.attuid !== employee.attuid);
            if (emailExists) {
                alert("This email is already assigned to another employee!");
                return;
            }

            employee.name = updatedName;
            employee.email = updatedEmail;
            employee.phoneno = updatedPhoneno;
            employee.department = updatedDepartment;
            employee.manager = updatedManager;
            employee.salary = updatedSalary;

            localStorage.setItem("employees", JSON.stringify(employees));

            alert("Employee details updated successfully!");
            location.href = "employees.html";
        });
    } else {
        alert("Employee not found!");
        location.href = "employees.html";
    }
});
