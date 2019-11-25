// // check if the user is registered or not 

var usermodel = require('../model/UsersModel');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');




function validator(req, res, next) {
	usermodel.User.findOne({
		where: { username: req.body.username }
	})
		//user have been rergistered
		.then(function (result) {
			if (result != null) {
				next();
			} else {
				next({ "status": 409, "message": "Credential didn't match" });
			}
		})
		.catch(function (err) {
			next({ "status": 409, "message": err });
		})

}

function check(req, res, next) {
	usermodel.User.findOne({
		where: { username: req.body.username }
	})

		.then(function (result) {
			if (result != null) {
				bcrypt.compare(req.body.password, result.dataValues.password, function (err, res) {
					if (res) {
						// next({"status":200,"message":"Valid user login"});
						next()

					} else {
						next({ "status": 409, "message": "Credential didn't match." });
					}
				});
			} else {
				next({ "status": 409, "message": "Credential didn't match." });
			}
		})
		.catch(function (err) {
			next({ "status": 500, "message": "Error Occured" });
		})
}

function jwtTokenGen(req, res, next) {
	console.log(req.body.username);
	console.log('asdasdasd');
	jwt.sign({
		username: req.body.username,
		accessLevel: 'superadmin'
	}, 'thisissecretkey', {
			expiresIn: "10h"
		},
		function (err, token) {
			if (err != null || undefined) {
				console.log('err')
				// next({"status":401, "message":"Unauthorized token"})
			}
			else {
				req.genToken = token;
				console.log(token)
				next();
			}

		}
	)

}


function tokenVerify(req, res, next) {

	console.log(req.headers)

	if (req.headers.authorization == undefined) {

		next({ status: 500, message: 'no authorization header present' })

	}
	else {

		let token = req.headers.authorization.slice(7, req.headers.authorization.length)

		jwt.verify(token, 'thisissecretkey', function (err, decoded) {
			console.log(decoded);
			if (err != null) {
				next({ status: 500, message: err.message })
				console.log(err);
			}
			else {
				next();
			}
		})

	}
}




module.exports = {
	validator,
	check,
	jwtTokenGen,
	tokenVerify

}