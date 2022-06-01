require("dotenv").config();
const mysql = require("mysql");
const inquier = require("inquirer");
const cTable = require("console.table");

// set connection to the database
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employee_DB",
});
