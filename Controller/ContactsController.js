var contactmodel = require('../model/contactmodel');
var bcrypt = require('bcrypt');
var saltRounds = 10;




function suggestionForm(req,res,next){
    // console.log(req.body);
    contactmodel.contact.create({
        id: req.body.id,
        Name: req.body.Name,
        email: req.body.email,
        Phoneno: req.body.Phoneno,
        Message: req.body.Message
    })
    .then(function(result){
        next();
    })
    .catch(function(err){
        next({"status":500,"message":"DB error"});
    })

}

module.exports = {suggestionForm};




