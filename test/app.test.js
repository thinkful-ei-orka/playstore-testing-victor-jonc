const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

supertest(app).get('/').expect(200, 'Hello Express');
