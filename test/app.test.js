const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

supertest(app).get('/apps').expect(200);

//TODO: Test if an array is coming back on the .expect(200, [body])
