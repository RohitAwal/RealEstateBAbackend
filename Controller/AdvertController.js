var advertmodel = require('../model/AdvertModel');
var bcrypt = require('bcrypt');
var saltRounds = 10;




function advertForm(req,res,next){
    // console.log(req.body);
    advertmodel.advert.create({
        id:req.body.id,
        I_have:req.body.I_have,
        I_want:req.body.I_want,
        Name: req.body.Name,
        Email: req.body.Email,
        Phoneno: req.body.Phoneno,
        Adtitle: req.body.Adtitle,
        Description: req.body.Description,
        Location: req.body.Location,
        LandArea: req.body.LandArea,
        Price: req.body.Price
    })
    .then(function(result){
        next();
    })
    .catch(function(err){
        next({"status": 500, "message":"DB error"});
    })
}

module.exports = {advertForm};




