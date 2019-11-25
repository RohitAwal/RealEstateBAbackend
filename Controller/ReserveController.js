var reservemodel = require('../model/ReserveModel');
var bcrypt = require('bcrypt');
var saltRounds = 10;




function reserveForm(req,res,next){
    // console.log(req.body);
    reservemodel.reserve.create({
        id:req.body.id,
        fullname: req.body.fullname,
        email: req.body.email,
        phoneno: req.body.phoneno,
        address: req.body.address,
        departure: req.body.departure,
        destination: req.body.destination,
        people: req.body.people
    })
    .then(function(result){
        next();
    })
    .catch(function(err){
        next({"status": 500, "message":"DB error"});
    })
}

module.exports = {reserveForm};




