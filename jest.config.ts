// jest.config.js

module.exports = {
	roots:['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns:[
	"/node_modules"
	],
  verbose:true,
  setupFilesAfterEnv: ['./jest.setup.ts']
 };
