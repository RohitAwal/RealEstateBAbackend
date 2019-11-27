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
    serverRun = server.listen(3005, done);
});

after(done => {
    serverRun.close(done);
});

describe('Contact', function(){
    describe('post contact', function(){
        it('it should add the contact', function(done){
            chai.request(server)
                .post('/v1/contact')
                .send({
                    'Name':'rohraamit',
                    'email':'awal@gmail.com',
                    'Phoneno':'345678',
                    'Message':'roheeetcjnskckb'
                   
                })
                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    
                    done() 
                })
                
                

        })

        
    })
})

// update testing


describe('PUT Contact', function(){
    describe('update  ', function(){
        nid = 8;
        it('it should update the contact', function(done){
            chai.request(server)
                .put('/v1/contact/' + nid)
                .send({
                    'Name':'rohraamit',
                    'email':'awal@gmail.com',
                    'Phoneno':'345678',
                    'Message':'roheeetcjnskckb'
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
describe('delete contact', function() {
    nid = 6;
    it('it should delete the contact', function(done) {
        chai.request(server)
            .delete('/v1/contact/' + nid)
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
