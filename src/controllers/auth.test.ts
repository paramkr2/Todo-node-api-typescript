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
  await clearDatabase(); 
});

afterAll(async () => {

  await mongoose.connection.close();
});

describe('Test Signup->Login->CreateTo->GetTodo', () => {
		
		/* This runs before each test , commanly used if we have something common, or 
			setup before each test case 
			beforeEach(async () => {
				await clearDatabase(); 
			});
		*/
		const userdata = {
		  username: 'testUser',
		  password: 'password123',
		  email:"testuser@example.com",
		};
		let token ;
	  test('should create a new user with valid data', async () => {
		const res = await request(app)
		  .post('/auth/signup')
		  .send(userdata)
		  .expect(201);
		expect(res.body.success).toEqual(true);
	  });
	  
	  test('login with the created user', async()=>{
		
		const res = await request(app)
			.post('/auth/login')
			.send({username: 'testUser', password: 'password123'})
			.expect(200)
		expect(res.body.success).toEqual(true) 
		token = res.body.token
	});
	
	test('create data ' , async()=>{
		const todoData = {
			title:'Jawan',
			description:'Starring: Shahrukh khan'
		};
		const res = await request(app)
			.post('/todo/createtodo')
			.set('Authorization',`${token}`)
			.send(todoData)
		expect(res.body.success).toEqual(true)
	});
	
	test('get data', async()=>{
		const res = await request(app)
			.get('/todo/gettodo')
			.set('Authorization',`${token}`)
		
		expect(res.statusCode).toBe(200)
		//console.log(res.body)
		expect(res.body.data[0]['title']).toEqual('Jawan')
	});
  // Add more tests to cover other scenarios like invalid characters, etc.
});
