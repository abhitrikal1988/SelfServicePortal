const oracledb = require('oracledb');
require('dotenv').config();

// Enable thin mode for pure JavaScript execution (requires no instant client binaries)
oracledb.initOracleClient();

async function queryDatabase(sql, binds = []) {
  let connection;

  try {
    // Establish connection to Oracle Database
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING
    });

    // Execute query and request results as JSON objects
    const result = await connection.execute(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    
    return result.rows;
  } catch (err) {
    console.error('Database query execution failure:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        // Ensure connection always terminates
        await connection.close();
      } catch (err) {
        console.error('Error closing database connection:', err);
      }
    }
  }
}

module.exports = { queryDatabase };