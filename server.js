require("dotenv").config();
const mysql = require("mysql2");
const inquier = require("inquirer");
const cTable = require("console.table");

// create connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employee_DB",
});

//connect to the database

db.connect((err) => {
  if (err) throw err;
  console.log("connected to employee_db");

  runPrompt();
});

// function to run the starting questions prompt

function runPrompt() {
  inquier
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View Department",
        "View role",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Role",
        "Quit",
      ],
    })
    .then(function (selection) {
      console.log(selection);

      //contional satement to run the application in accordance to the user choice
      if (selection.action === "View All Employees") {
        viewAll();
      } else if (selection.action === "View Department") {
        viewDepartment();
      } else if (selection.action === "View role") {
        viewRole();
      } else if (selection.action === "Add Employee") {
        addEmployee();
      } else if (selection.action === "Add Department") {
        addDepartment();
      } else if (selection.action === "Add Role") {
        addRole();
      } else if (selection.action === "Update Role") {
        updateRole();
      } else {
        db.end();
      }
    });
}

// function to view all employess
function viewAll() {
  const sql = `SELECT employee.id,
  employee.first_name,
  employee.last_name,
  role.title,
  department.name AS department,
  role.salary,
  CONCAT(e.first_name," ",e.last_name) AS manager
  FROM employee
  INNER JOIN role
  ON employee.role_id = role.id
  INNER JOIN department
  ON role.department_id = department.id
  INNER JOIN employee e
  ON employee.manager_id = e.id
  ORDER BY employee.id;`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    // run prompt again to start the application from the begining
    runPrompt();
  });
}

// function to view departments

function viewDepartment() {
  const sql = "SELECT * FROM department";
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    // run prompt again to start the application from the begining
    runPrompt();
  });
}

// function to view all roles

function viewRole() {
  const sql = `SELECT role.id, role.title, role.salary , department.name AS department
  FROM role
  INNER JOIN department ON department.id=role.department_id`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    // run prompt again to start the application from the begining
    runPrompt();
  });
}

// add array to save all the employee names and id, roles and departments

let employeeListArray = [];
let employeeRolesArray = [];
let departmentArray = [];
// function to save all the employee inside the array

function employeeList() {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    res.forEach((employee) => {
      employeeListArray.push(
        `${employee.id}-${employee.first_name} ${employee.last_name}`
      );
    });
    // console.log(employeeListArray);
  });
}

// function to save all the roles of the db inside an array

function employeeRoles() {
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    res.forEach((role) => {
      employeeRolesArray.push(`${role.id}-${role.title}`);
    });
    // console.log(employeeRolesArray);
  });
}

// function to save all the departments of the db inside an array

function employeeDepartments() {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    res.forEach((department) => {
      departmentArray.push(`${department.id}-${department.name}`);
    });
    // console.log(departmentArray);
  });
}

// function to add employee

function addEmployee() {
  // upadte the array everytime the function is called
  employeeRoles();
  employeeList();

  inquier
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role",
        type: "list",
        message: "What is the employee's role?",
        choices: employeeRolesArray,
      },

      {
        name: "reportingTo",
        type: "list",
        message: "Who is the employee's manager?",
        choices: employeeListArray,
      },
    ])
    .then(function (newEmployee) {
      let newEmployeeRoleId = newEmployee.role.split("-");
      let newEmployeeManagerId = newEmployee.reportingTo.split("-");
      let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ('${newEmployee.firstname}','${newEmployee.lastname}','${newEmployeeRoleId[0]}','${newEmployeeManagerId[0]}')`;
      db.query(sql, (err, res) => {
        if (err) throw err;
        console.log(`${newEmployee.firstname} ${newEmployee.lastname} added`);
      });

      runPrompt();
    });
}

// function to add roles

function addRole() {
  employeeRoles();
}

// function to add department

function addDepartment() {
  employeeDepartments();
}
