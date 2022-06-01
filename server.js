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
    });
}
