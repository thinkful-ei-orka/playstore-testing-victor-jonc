const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('PlayStore App', () => {
     it('should return a GET message', () => {
          return supertest(app).get('/apps').expect(200);
     })

     it('should return an array of objects', () => {
           return supertest(app)
           .get('/apps')
           .expect(200)
           .expect('Content-Type', /json/)
           .then(res => {
                expect(res.body).to.be.an('array');
           })
     })

     it('should GET /genre', () => {
          return supertest(app)
          .get('/apps')
          .query({ genre: 'Action' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
               expect(res.body).to.be.an('array');
               console.log(res.body)
               expect(res.body).to.have.lengthOf.at.least(1);
               // expect(res.body).to.have.nested.property('Genres', 'Action');
               res.body.forEach(obj => {
                    console.log(obj['Genres'])
                    expect(obj['Genres']).to.include('Action')
               }) 
          })
    })
})
//TODO: Test if an array is coming back on the .expect(200, [body])
