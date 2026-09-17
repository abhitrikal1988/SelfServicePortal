const { test: base, expect } = require('@playwright/test');
const { MongoClient } = require('mongodb');

// Extend the base test with a custom "db" fixture
const test = base.extend({
  db: async ({}, use) => {
    // 1. Initialize the MongoDB Client
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    // 2. Establish connection
    await client.connect();
    const database = client.db(process.env.MONGODB_DB_NAME || 'my_test_db');

    // 3. Pass the database instance to the test
    await use(database);

    // 4. Teardown: Clean up the connection after the test runs
    await client.close();
  },
});

module.exports = { test, expect };