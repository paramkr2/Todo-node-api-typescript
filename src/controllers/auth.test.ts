const request = require('supertest');
const {app} = require('../index'); // Replace with your server's entry point
import dbconnect from "../config/db";
import mongoose from 'mongoose'

const clearDatabase = async () => {
  // Drop all collections in the database
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
};

beforeAll(async () => {
  await dbconnect();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /auth/signup', () => {
	
	  beforeEach(async () => {
		await clearDatabase(); 
	  });

  test('should create a new user with valid data', async () => {
    const newUserData = {
      username: 'testUser',
      password: 'password123',
	  email:"testuser@example.com",
    };
	
    const response = await request(app)
      .post('/auth/signup')
      .send(newUserData)
      .expect(201);

    expect(response.body.success).toEqual(true);
  });

  test('should handle missing username or password', async () => {
    const incompleteData = {
      username: 'testUser', // Missing password
    };

    const response = await request(app)
      .post('/auth/signup')
      .send(incompleteData)
      .expect(400);

    expect(response.body).toEqual({ error: 'Missing username or password' });
  });

  test('should handle duplicate username', async () => {
    // Create a user with the username beforehand (outside the test)
    // ... (code to create the user)

    const duplicateData = {
      username: 'existingUser', // Username used for the created user
      password: 'anyPassword',
    };

    const response = await request(app)
      .post('/auth/signup')
      .send(duplicateData)
      .expect(409);

    expect(response.body).toEqual({ error: 'Username already exists' });
  });

  // Add more tests to cover other scenarios like invalid characters, etc.
});
