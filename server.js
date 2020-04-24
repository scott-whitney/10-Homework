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
            message: "Select if you'd like to add an item or bid on an existing item.",
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
    console.log("Loading Add a Department\n");
)
    connection.query("INSERT INTO (title), ?, ?)", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      artistSongs = []

      
      for(i=0; i<res.length; i++){
        if(res[i].releaseYear <= yearTop && res[i].releaseYear >= yearBot){
            artistSongs.push(res[i])
        }
      }
      console.table(artistSongs)

      mainMenu()
    });
}
function addEmployee(){
console.log("adding employee")
// this will be a prompt followed by an INSERT
mainMenu()
}
function addRole(){
console.log("adding Role")
// this will be a prompt followed by an INSERT
mainMenu()
}

function updateEmployee(){
    console.log("Updating Employees")
//  const query = 'UPDATE to_do_list SET ? WHERE ?;';
    // this will be a prompt followed by an updating query then a response of the employees
    mainMenu()
}