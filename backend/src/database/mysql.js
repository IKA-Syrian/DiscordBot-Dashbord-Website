const mysql = require("mysql2")

module.exports = (data) => mysql.createPool(data)