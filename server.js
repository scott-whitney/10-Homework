var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "employee_trackerDB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
   mainMenu()
  });




  function mainMenu(){
    inquirer.prompt([
        {
            type: 'rawlist',
            name: "Bidder",
            message: "Select what you'd like to do",
            choices: ['View Departments', 'View Employees', 'View Roles', 'Add Department', 'Add Employee', 'Add Role', 'Update Employee', 'exit']
        }
    ]).then(answers => {
 
        if(answers.Bidder == "View Departments"){
           viewDepartment()
        } else if (answers.Bidder == "View Employees"){
            viewEmployee()
        } else if (answers.Bidder == "View Roles"){
            viewRole()
        } else if(answers.Bidder == "Add Department"){
            addDepartment()
        } else if(answers.Bidder == "Add Employee"){
            addEmployee()
        } else if(answers.Bidder == "Add Role"){
            addRole()
        } else if(answers.Bidder == "Update Employee"){
            updateEmployee()
        } else if(answers.Bidder == "exit"){
            console.log("come back soon.")
            connection.end()
        }
    })
}

function viewDepartment() {
    console.log("Bringing up Departments...");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res)
        console.log("To continue use arrow keys")
    })
    mainMenu()
}

function viewEmployee() {
    console.log("Bringing up Employees...");
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res)
        console.log("To continue use arrow keys")
    })
    mainMenu()
}

function viewRole() {
    console.log("Brining up Roles...");
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res)
        console.log("To continue use arrow keys")
    })
    mainMenu()
}
function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'what is the name of this new Department?'
        }
    ]).then(async answers => {
        console.log(answers)
        console.log("Inserting a new Department...\n");
        const newDepartment = answers.departmentName
        var query = connection.query(
          "INSERT INTO department SET ?",
          {
            name: newDepartment
          },
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            console.table(res)
            mainMenu()
          }
        );
        try {
        } catch (e) {
            console.log(e)
        }
    })

    
 
}
function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'what is the first name of this new employee?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: "what is their last name?"
        },
        {
            type: 'input',
            name: 'role',
            message: "what is their role ID?"
        },
        {
            type: 'input',
            name: 'manager',
            message: 'what is their manage id?'
        }
    ]).then(async answers => {
        console.log(answers)
        console.log("Inserting a new Employee...\n");
        const first_Name = answers.firstName
        const last_Name = answers.lastName
        const role_ID = answers.role
        const manager_ID = answers.manager

        var query = connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: first_Name,
            last_name: last_Name,
            role_id: role_ID,
            manager_id: manager_ID

          },
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            console.table(res)
            mainMenu()
          }
        );
        try {
        } catch (e) {
            console.log(e)
            mainMenu()
        }
    })

    
 
}
function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'what is the title of this role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: "what is the salary of this position"
        },
        {
            type: 'input',
            name: 'department_id',
            message: "what is the department id?"
        }
    ]).then(async answers => {
        console.log(answers)
        console.log("Inserting a new role...\n");
        const title_answer = answers.title
        const salary_answer = answers.salary
        const department_answer = answers.department_id

        var query = connection.query(
          "INSERT INTO role SET ?",
          {
            title: title_answer,
            salary: salary_answer,
            department_id: department_answer
          },
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            console.table(res)
            mainMenu()
          }
        );
        try {
        } catch (e) {
            console.log(e)
            mainMenu()
        }
    })


}




function updateEmployee(){
    console.log("Updating Employees")
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_Name',
            message: 'what is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'role',
            message: "what is the id of their new role?"
        }
    ]).then(async answers => {
        console.log(answers)
        console.log("Inserting a new role...\n");
        const firstName_answer = answers.first_Name
        const role_answer = answers.role

        var query = connection.query(
          "UPDATE employee SET ? WHERE ?;",
          [{
            first_name: firstName_answer
          },
          {
            role_id: role_answer
          }],
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role updated!\n");
            // Call updateProduct AFTER the INSERT completes
            console.table(res)
            mainMenu()
          }
        );
        try {
           
        } catch (e) {
            console.log(e)
            mainMenu()
        }
    })
}