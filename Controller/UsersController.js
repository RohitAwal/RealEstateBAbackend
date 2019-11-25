var usermodel = require('../model/UsersModel');
var bcrypt = require('bcrypt');
var saltRounds = 10;


// val (req)
// var x = req.body.price *1.6
// req.newval = x
function validator(req,res,next){
    // console.log(req.body);
    // console.log('asdasda');

    // console.log(req.body);
    // console.log(usermodel.User);

    usermodel.User.findOne({
        where : { username:req.body.username}
    })
    .then(function(result){
       console.log(result.dataValues);
        next({"status":409, "message":"user already exists"})
        
        // if(result.dataValues!= ''){
        //     next({"status":409, "message":"user already exists"})
        // }

        
    })
    .catch(function(err){
        next();
    })
}
// }
// function registerUser (){
//     usermodel.User.create({
//         username: 'sdfsdf',
//         password: 'aasdasd',
//         address: 'asdasd'
//     })
//     .then(function(result){
//         console.log(result);
//     })
//     .catch(function(err){
//         console.log(err);
//     })
// }
function hashGenerator(req,res,next){
  //console.log('hhhhhello');
// req.body.password
bcrypt.hash(req.body.password, saltRounds)
.then(function(hash){
 //   console.log('ggg');
   //console.log(hash);
    req.hashvalue=hash;
next();
})
.catch(function(err){
next({"status":500,"message":"DB error"})
})
} 

function registerUser(req,res,next){
    // console.log('hhh');
    // console.log(req.body);
    usermodel.User.create({


        id: req.body.id,
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Phoneno: req.body.Phoneno,
        username: req.body.username,
        password: req.hashvalue,
        address: req.body.address
    })
    .then(function(result){
       
        // console.log(result);
next();
    })
    .catch(function(err){
        // next('this is error');
        // console.log(err)

        next({"status":500,"message":"asda"});

    })
}

// function getEachUsers(req, res) {
//     console.log('sjlkjfs')
//     usermodel.User.findOne({
//         where:{
//             id:req.params.uid
//         }
//     })
//         .then(function (result) {
//             console.log(result)
//             res.status(201)
//             res.json(result)
//         })
//         .catch(function (err) {
//             next({"status":500,"message":"error"})

//         })

// }
// registerUser();
module.exports = {
    validator,
     registerUser,
     hashGenerator
    //  getEachUsers
 
}
// module.exports ={
//  validator
// }