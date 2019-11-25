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
    serverRun = server.listen(3004, done);
});

after(done => {
    serverRun.close(done);
});

describe('Users', function(){
    describe('post register', function(){
        it('it should add the users', function(done){
            chai.request(server)
                .post('/v1/users')
                .send({
                    'Firstname':'rohit',
                    'Lastname':'awal',
                    'Phoneno':'345678',
                    'username':'roheeet',
                    'address':'bode',
                    'password':'awaal'
                })
                .end(function (err,res) {
                    res.should.have.status(409);
                    // res.body.should.be.an('object');
                    
                    done() 
                })
                
                

        })

        
    })
})

//update testing


describe('PUT users', function(){
    describe('update  ', function(){
        nid = 6;
        it('it should update the notice', function(done){
            chai.request(server)
                .put('/v1/users/' + nid)
                .send({
                    'Firstname':'rohit',
                    'Lastname':'awal',
                    'Phoneno':'345678',
                    'username':'roheeet',
                    'address':'bode',
                    'password':'awaal'
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
describe('delete users', function() {
    nid = 6;
    it('it should delete the users', function(done) {
        chai.request(server)
            .delete('/v1/users/' + nid)
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
