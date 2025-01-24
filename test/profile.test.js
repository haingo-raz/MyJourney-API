import { expect } from 'chai'
import request from 'supertest'
import app from '../index.js'

describe('Profile Tests', () => {
    it('should return the profile details of a user based on their email', (done) => {
        const user_email = 'admin@mj.com'

        request(app)
            .get(`/profile/${user_email}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).to.be.an('object')
                expect(res.body)
                    .to.have.property('user_email')
                    .to.equal(user_email)
                done()
            })
    })
})
