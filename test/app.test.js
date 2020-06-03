const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('PlayStore App', () => {
  it('should return a GET message', () => {
    return supertest(app).get('/apps').expect(200);
  });

  it('should return an array of objects', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).to.be.an('array');
      });
  });

  it('should GET /genre', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: 'Action' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).to.be.an('array');
        console.log(res.body);
        expect(res.body).to.have.lengthOf.at.least(1);
        // expect(res.body).to.have.nested.property('Genres', 'Action');
        res.body.forEach((obj) => {
          console.log(obj['Genres']);
          expect(obj['Genres']).to.include('Action');
        });
      });
  });

  it('testing the sort by rating', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'Rating' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        console.log(res.body);

        expect(res.body).to.be.an('array');
        let sorted = true;
        let i = 0;
        while (i < res.body.length - 1) {
          const appAtI = res.body[i];
          const appAtIPlusOne = res.body[i] + 1;
          if (appAtIPlusOne.Rating < appAtI.Rating) {
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
  it('testing the sort by title', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'App' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        console.log(res.body);

        expect(res.body).to.be.an('array');
        let sorted = true;
        let i = 0;
        while (i < res.body.length - 1) {
          const appAtI = res.body[i];
          const appAtIPlusOne = res.body[i] + 1;
          if (appAtIPlusOne.App < appAtI.App) {
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});
