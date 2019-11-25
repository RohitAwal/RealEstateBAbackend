const chai = require('chai');
const chaiHttp = require('chai-http');
var should = chai.should();
const chaiLike = require('chai-like');
const chaiThings = require('chai-things');

const server  = require("../index");
// console.log(server)
var serverRun;
chai.use(chaiHttp);
chai.use(chaiLike);
chai.use(chaiThings);

before(done =>{
    serverRun = server.listen(3007, done);
});

after(done => {
    serverRun.close(done);
});

describe('reserve', function(){
    describe('post reserve', function(){
        it('it should add the reserve', function(done){
            chai.request(server)
                .post('/v1/reserve')
                .send({
                    'fullname':'roheet',
                    'email':'awal',
                    'phoneno':'345678',
                    'address':'bode',
                    'departure':'evening',
                    'destination':'pokhara',
                    'people':'1',
                })
                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    
                    done() 
                })
                
                

        })

        
    })
});

//update testing


describe('PUT reserve', function(){
    describe('update  ', function(){
        nid = 6;
        it('it should update the reserve', function(done){
            chai.request(server)
                .put('/v1/reserve/' + nid)
                .send({
                    'fullname':'roheet',
                    'email':'awal',
                    'phoneno':'345678',
                    'address':'bode',
                    'departure':'evening',
                    'destination':'pokhara',
                    'people':'1',
                })
                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done()

                });

        })
    })
});


//delete testing
describe('delete reserve', function() {
    nid = 6;
    it('it should delete the reserve', function(done) {
        chai.request(server)
            .delete('/v1/reserve/' + nid)
            // .send({
            //     'address': 'testAddress',
            //     'pass':'hit2'
            // })
            .end(function(err, res) {
                res.should.have.status(500);
                res.body.should.have.property('message');
                done();
            })
    })

});
