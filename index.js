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
  'View all departments': viewDepartments,
  'Add Department': addDepartment,
  'View all positions': viewPositions,
  'Add position': addPosition,
  'View all employees': viewEmployees,
  'Add employee': addEmployee, 
  'Update employee role': updateEmployeeRole,
}

start();
function start() {
  
  inquirer
    .prompt({
      name: 'nav',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View all departments', 'Add Department', 'View all positions', 'Add position', 'View all employees', 'Add employee', 'Update employee role'],
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
    })
};

async function viewDepartments() {
  try {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, rows, fields) => {
      console.log(JSON.stringify(rows));
      start();
  

    });
  } catch {

  }
}

async function addDepartment() {
  try {
    
    inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'New Department ID?',
      },
      {
        name: 'd_name',
        type: 'input',
        message: 'New Department Name?',
      }
    ]).then( response =>{
      const query = `INSERT INTO department (id, d_name)
      VALUES ('${response.id}', '${response.d_name}');`;
  
    
  
      connection.execute(query, (err, rows, fields) => {
  console.log(err);
        console.log(JSON.stringify(rows));
        start();
  
  
      });
    })
   
  } catch {

  }
}

async function viewPositions() {
  try {
    const query = 'SELECT * FROM jobPosition';
    connection.query(query, (err, rows, fields) => {
      console.log(JSON.stringify(rows));
      start();
  

    });
  } catch {

  }
}

async function addPosition() {
  try {
    
    inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'New Positon ID?',
      },
      {
        name: 'pos_name',
        type: 'input',
        message: 'New Position Name?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Input Salary',
      }
    ]).then( response =>{
      const query = `INSERT INTO jobPosition (id, pos_name, salary, dep_id)
      VALUES ('${response.id}', '${response.pos_name}, '${response.salary}');`;
  
    
  
      connection.execute(query, (err, rows, fields) => {
  console.log(err);
        console.log(JSON.stringify(rows));
        start();
  
  
      });
    })
   
  } catch {

  }
}

async function viewEmployees() {
  try {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, rows, fields) => {
      console.log(JSON.stringify(rows));
      start();
  

    });
  } catch {

  }
}

async function addEmployee() {
  try {
    
    inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'Employee ID?',
      },
      {
        name: 'first_name',
        type: 'input',
        message: 'First name',
      },
      {
        name: 'last_inital',
        type: 'input',
        message: 'Last Init',
      },
      {
        name: 'dep_id',
        type: 'input',
        message: 'Department ID',
      },
      {
        name: 'jobPosition_id',
        type: 'input',
        message: 'Job position id',
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'Manager id',
      }
    ]).then( response =>{
      let mgrId = response.manager_id == '' ? 'NULL': `${response.manager_id}`
      const query = `INSERT INTO employee (id, first_name, last_inital, dep_id, jobPosition_id, manager_id)
      VALUES ('${response.id}', '${response.first_name}', '${response.last_inital}', ${response.dep_id}, ${response.jobPosition_id}, ${mgrId});`;
  
    
  
      connection.execute(query, (err, rows, fields) => {
  console.log(err);
        console.log(JSON.stringify(rows));
        start();
  
  
      });
    })
   
  } catch {

  }
}

async function updateEmployeeRole() {
  try {
    
    inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'Employee ID?',
      },
      {
        name: 'first_name',
        type: 'input',
        message: 'First name',
      },
      {
        name: 'last_inital',
        type: 'input',
        message: 'Last Init',
      },
      {
        name: 'dep_id',
        type: 'input',
        message: 'Department ID',
      },
      {
        name: 'jobPosition_id',
        type: 'input',
        message: 'Job position id',
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'Manager id',
      }
    ]).then( response =>{
      let mgrId = response.manager_id == '' ? 'NULL': `${response.manager_id}`
      const query = `UPDATE employee

       SET first_name = '${response.first_name}',   
           last_inital = '${response.last_inital}',
           dep_id = ${response.dep_id},
           jobPosition_id = ${response.jobPosition_id},
           manager_id = ${mgrId}
       
       WHERE id = ${response.id}`
  
    
  
      connection.execute(query, (err, rows, fields) => {
  console.log(err);
        console.log(JSON.stringify(rows));
        start();
  
  
      });
    })
   
  } catch {

  }
}