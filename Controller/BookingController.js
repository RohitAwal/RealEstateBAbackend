var bookingmodel = require('../model/BookingModel');
var bcrypt = require('bcrypt');
var saltRounds = 10;




function bookingForm(req,res,next){
    // console.log(req.body);
    bookingmodel.Booking.create({
        id: req.body.id,
        Image: req.body.Image,
        NameOfPlace: req.body.NameOfPlace,
        Price: req.body.Price,
        Description: req.body.Description
    })
    .then(function(result){
        next();
    })
    .catch(function(err){
        next({"status": 500, "message":"DB error"});
    })
}

module.exports = {bookingForm};




