const inquirer = require('inquirer');
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');
const cTable = require('console.table');

require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
  port: process.env.DB_PORT
},connection.connect((err) => {
  if (err) { console.log(err.message);}
  console.log("db " + connection.state);
}));  

start();
function start() {
  inquirer
  .prompt({
    name: 'nav',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View all departments','Add Department','View all positions','Add position','View all employees', 'Add employee', 'Update employee role'],
  })
.then((choices) => {
  switch(choices.nav) {
    case 'View all departments':
      viewDepartments();
      break;
    case 'Add Department':
      addDepartment();
      break;
    case 'View all positions':
      viewPositions();
      break;
    case 'Add position':
      addPosition();
      break;
    case 'View all employees':
      viewEmployees();
      break;
    case 'Add employee':
      addEmployee();
      break;
    case 'Update employee role':
      updateEmployeeRole();
      break;
  }})};

async function viewDepartments() {
  try {
    const queary = 'SELECT * FROM department';
  }
}

async function addDepartment() {

}
  
async function viewPositions() {

}

async function addPosition() {

}

async function viewEmployees() {

}

async function addEmployee() {

}

async function updateEmployeeRole() {
  
}