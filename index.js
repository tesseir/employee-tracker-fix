const inquirer = require('inquirer');
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');
const cTable = require('console.table');

require('dotenv').config();


const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
}
/*,connection.connect((err) => {
  if (err) { console.log(err.message);}
  console.log("db " + connection.state);
})*/);  

const choiceMap = {
  'View all departments':viewDepartments,
  'Add Department':addDepartment,
}

start();
function start() {
  inquirer
  .prompt({
    name: 'nav',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View all departments','Add Department','View all positions','Add position','View all employees', 'Add employee', 'Update employee role'],
  })
.then(async (choices) => {

  await choiceMap[choices.nav]();
/*
  switch(choices.nav) {
    case 'View all departments':
      await viewDepartments();
      break;
    case 'Add Department':
      await addDepartment();
      break;
    case 'View all positions':
      await viewPositions();
      break;
    case 'Add position':
      await addPosition();
      break;
    case 'View all employees':
      await viewEmployees();
      break;
    case 'Add employee':
      await addEmployee();
      break;
    case 'Update employee role':
      await updateEmployeeRole();
      break;
  }*/
})};

async function viewDepartments() {
  try {
    const query = 'SELECT * FROM department';
    connection.query(query, (err,rows,fields )=>{
      console.log(JSON.stringify(rows));
      

    });
  } catch {

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