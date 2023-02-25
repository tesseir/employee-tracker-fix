const inquirer = require('inquirer');
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');
const cTable = require('console.table');

require('dotenv').config();


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employee_roster_db',
  port: '3306'
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

navMenus();
function navMenus() {

  inquirer
    .prompt({
      name: 'nav',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View all departments', 'Add Department', 'View all positions', 'Add position', 'View all employees', 'Add employee', 'Update employee role'],
    })
    .then(async (choices) => {
      console.log(choices);
      await choiceMap[choices.nav]();
    })
};

async function viewDepartments() {
  try {
    const query = `SELECT id as 'department id', d_name as 'department' FROM department`;
    const result = await connection.promise().query(query);
    console.table(result[0]);
  } catch (error) {
    console.log(error);
  } finally {
    navMenus();
  }
};

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
      ]).then(response => {
        const query = `INSERT INTO department (id, d_name)
      VALUES ('${response.id}', '${response.d_name}');`;
        connection.execute(query, () => {
          console.log("Department added");
          navMenus();
        })
      })
  } catch (error) {
    console.log(error);
  }
};

async function viewPositions() {
  try {
    const query = `SELECT id as 'ID', pos_name as 'Position Name', salary as 'Salary' FROM jobPosition`;
    const results = await connection.promise().query(query);
    console.table(results[0]);
  } catch (error) {
    console.log(error);
  } finally {
    navMenus();
  }
};

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
      ]).then(response => {
        const query = `INSERT INTO jobPosition (id, pos_name, salary, dep_id)
      VALUES ('${response.id}', '${response.pos_name}, '${response.salary}');`;
      connection.execute(query, () => {
        console.log("Position added");
        navMenus();
      })
    })
} catch (error) {
  console.log(error);
}
}

async function viewEmployees() {
  try {
    const query = `SELECT 
    id as 'ID', 
    first_name as 'First Name', 
    last_inital as 'Last Initial', 
    dep_id as 'Department', 
    jobPosition_id as 'Position', 
    manager_id as 'Manager ID'
    FROM employee`;
    const results = await connection.promise().query(query);
    console.table(results[0]);
  } catch (error) {
    console.log(error);
  } finally {
    navMenus();
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
      ]).then(response => {
        let mgrId = response.manager_id == '' ? 'NULL' : `${response.manager_id}`
        const query = `INSERT INTO employee (id, first_name, last_inital, dep_id, jobPosition_id, manager_id)
      VALUES ('${response.id}', '${response.first_name}', '${response.last_inital}', ${response.dep_id}, ${response.jobPosition_id}, ${mgrId});`;
      connection.execute(query, () => {
        console.log("Employee added");
        navMenus();
      })
    })
} catch (error) {
  console.log(error);
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
      ]).then(response => {
        let mgrId = response.manager_id == '' ? 'NULL' : `${response.manager_id}`
        const query = `UPDATE employee SET 
          first_name = '${response.first_name}',   
          last_inital = '${response.last_inital}',
          dep_id = ${response.dep_id},
          jobPosition_id = ${response.jobPosition_id},
          manager_id = ${mgrId}
          WHERE id = ${response.id}`
       connection.execute(query, () => {
        console.log("Employee Updated");
        navMenus();
      })
    })
} catch (error) {
  console.log(error);
}
}


