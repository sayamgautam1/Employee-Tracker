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
        viewrole();
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
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.id, department.id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`;
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
