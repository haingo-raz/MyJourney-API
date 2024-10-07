import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Login Tests', () => {

  it('should return success for valid credentials', (done) => {
    const user = { email: 'admin@mj.com', password: 'admin' }; // Valid user credentials

    request(app)
      .post('/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message').to.equal('Success');
        expect(res.body).to.have.property('email').to.equal(user.email);
        done();
      });
  });

  it('should return 400 for invalid password', (done) => {
    const user = { email: 'admin@mj.com', password: 'wrongpassword' }; // Invalid password

    request(app)
      .post('/login')
      .send(user)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message').to.equal('Invalid email or password');
        done();
      });
  });

  it('should return 404 for non-existent user', (done) => {
    const user = { email: 'nonexistent@example.com', password: 'anypassword' }; // Non-existent user

    request(app)
      .post('/login')
      .send(user)
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message').to.equal('User not found');
        done();
      });
  });
});