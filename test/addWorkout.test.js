import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('Workout Tests', () => {

    it('should create a new workout instance with the appropriate properties', (done) => {
        const newWorkout = { 
            title: 'Test Workout', 
            videoUrl: 'https://www.youtube.com/watch?v=kuH-RRf6WP0',
            duration: 21,
            user_email: 'admin@mj.com',
            dayCreated: '2024-10-17',
            status: "False"
        };

        request(app)
            .post('/add')
            .send(newWorkout)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.equal('Success');
                done();
            });
    });

    it('should return 404 when not all required properties are provided', (done) => {
        const newWorkout = {
            title: 'Test Workout',
            videoUrl: '',
            duration: 21,
            user_email: 'admin@mj.com',
            dayCreated: '2024-10-17',
            status: "False"
        };

        request(app)
            .post('/add')
            .send(newWorkout)
            .expect(400)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('error').to.equal('Email, videoUrl, title and duration are required');
                done();
            });
    });
});
