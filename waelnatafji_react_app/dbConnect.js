const mysql = require("mysql");
const dotenv = require('dotenv');
dotenv.config();
// Create a connection to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: "mydb"
  });
  
  // open the MySQL connection
  connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
  
  module.exports = connection;
