
 // Get the client
import mysql from 'mysql2/promise';

// Create the connection to database

const dbConfig = {
  host: 'localhost',
  user: 'root',
  port: 3307,
  password: 'example',
  database: 'ppit',
  namedPlaceholders: true,
}

const db = mysql.createPool(dbConfig)
export {db}
  
