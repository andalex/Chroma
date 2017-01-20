const app       = require('../app');
var Music     = require('../models/music');
const mongoose  = require('mongoose');
const chai      = require('chai');
const chaiHttp  = require('chai-http');

chai.use(chaiHttp);
const expect    = chai.expect;
const assert    = chai.assert;
const should    = chai.should();
describe('server', () => {
    var request;
    beforeEach(() => {
        request = chai.request(app);
    });
    it('should create object in DB', (done) => {
        request.post('/api/music').send({
          song: "test-song",
          artist: "test-artist",
          year: "test-year",
          genre: "test-genre",
          rating: "test-rating",
        }).then(res => {
            res.should.have.status(200);
           done();
        }).catch(done);
    });
    it('should update music object in DB', (done) => {
        request.put('/api/music/:id').send({})
            .then(res => {
                res.should.have.status(200);
                done();
            }).catch(done);
    });
    it('should respond with music data', (done) => {
        request.get('/api/music')
            .then((res) => {
                res.should.have.status(200);
                done();
            }).catch(done);
    });
    it('should test that / main page renders', (done) => {
        request.get('/')
            .then((res) => {
                res.should.have.status(200);
                done();
            }).catch(done);
    });
});
