var express = require('express');
var multer = require('multer');
var application = new express();
var path = require('path');
application.use(express.static(path.join(__dirname, 'resources/photo/locationphoto')));
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var bodyParsar = require('body-parser'); 
var usermodel = require('./model/UsersModel')
var contactmodel = require('./model/contactmodel')
var bookmodel = require('./model/BookingModel')
var reservemodel = require('./model/ReserveModel')
var userController = require('./Controller/UsersController')
var bookingController = require('./Controller/BookingController')
var contactController = require('./Controller/ContactsController')
var reserveController = require('./Controller/ReserveController')
var authController = require('./Controller/AuthenticationController')

let initCallback; 
var swaggerDefinition = {

	info: {
		// API informations (required)
		title: 'Travel Agency Assignment', // Title (required)
		version: 'v1', // Version (required)
		description: 'API Documetation', // Description (optional)
	},
	host: 'localhost:3003', // Host (optional)
	basePath: '/', // Base path (optional)
securityDefinitions : {
	bearerAuth : {
		type: 'apiKey',
		name: 'authorization',
		scheme : 'bearer',
		in : 'header'
	}
}

}

var options = {
	swaggerDefinition,
	apis: ['./index.js']
}

const swaggerSpec = swaggerJSDoc(options);

application.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


application.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE'); 
    res.setHeader('Access-Control-Allow-Headers','content-type,X-Requested-With,authorization');
    next();
    });
// var userController = require('./Controller/UsersController');


    application.use(bodyParsar.json());
   /**
 * @swagger
 * /v1/users:
 *   post:
 *     tags:
 *      - Users
 *     name: Resigister name
 *     summary: This API registers a single  user
 *     description: Register a single user
 *     produces: application/json
 *     parameters:
 *     - name: User
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          Firstname:
 *           type:string
 *          Lastname:
 *           type:string
 *          Phoneno:
 *           type:string
 *          username:
 *           type: string
 *          address:
 *           type: string
 *          password:
 *           type: string
 *     responses:
 *       201:
 *         description: User was registered
 *       409:
 *        description: username already exists
 *       500:
 *        description: DB Error
 *
 */
    // console.log(userController);
    application.post('/v1/users',userController.hashGenerator,userController.validator,userController.registerUser,function(req,res,next){
            res.status(201);
            res.send({"message":"User is register to the account. You can login now"})
            // next(); 
        
        })
    

/**
 * @swagger
 * /v1/contact:
 *   post:
 *     tags:
 *      - Contacts
 *     name: Resigister contact
 *     summary: This API registers a single  user
 *     description: Register a single user
 *     produces: application/json
 *     parameters:
 *     - name: User
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          Name:
 *           type:string
 *          email:
 *           type:string
 *          Phoneno:
 *           type:string
 *          Message:
 *           type: string
 *          
 *     responses:
 *       201:
 *         description: Contact was registered
 *       409:
 *        description: Contact already exists
 *       500:
 *        description: DB Error
 *
 */
    application.post('/v1/contact',contactController.suggestionForm,function(req,res, next){
            res.status(201);
            res.send({"message":"Suggestion is Sent"})
    })


       /**
 * @swagger
 * /v1/reserve:
 *   post:
 *     tags:
 *      - Reserves
 *     name: Resigister reservattion
 *     summary: This API registers a single  reaeration
 *     description: Register a single reserve
 *     produces: application/json
 *     parameters:
 *     - name: User
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          fullname:
 *           type:string
 *          email:
 *           type:string
 *          phoneno:
 *           type:string
 *          address:
 *           type: string
 *          departure:
 *           type: string
 *          destination:
 *           type: string
 *          people:
 *           type: string
 *     responses:
 *       201:
 *         description: Reservation was registered
 *       409:
 *        description:reservation already exists
 *       500:
 *        description: DB Error
 *
 */

    application.post('/v1/reserve',reserveController.reserveForm,function(req,res, next){
        res.status(201);
        res.send({"message":"Your reservation is Register"})
    })



    application.post('/v1/book',bookingController.bookingForm,function(req, res, next){
        // res.status(201);
        res.send({"message":"Description about the place is Registered"})
})
 
   




application.get('/v1/users', function(req,res){
    usermodel.User.findAll({
        attributes: ['id','Firstname','Lastname','Phoneno','username','address']
    })
    .then(function(result){
        res.status(200);
        res.json(result);
    })
    .catch(function(err){
        
    })
})


application.get('/v1/book', function(req,res){
    bookmodel.Booking.findAll({
        attributes: ['id','Image','NameOfPlace','Price','Description']
    })
    .then(function(result){
        res.status(200);
        res.json(result);
    })
    .catch(function(err){
        
    })
})






application.delete('/v1/book/:id',function(req,res,next){
   console.log(req.params.id)
   bookmodel.Booking.destroy({
       where: {id : req.params.id}
   }) 
   .then(function(result){
       
    if (result == 1) {

        res.status(200)
        res.send({
            "message": "deleted succesfully"
        });
    } else {
        next({
            "status": 500,
            "message": "Couldnot delete"
        })

    }
   })
   .catch(function(err){
       next({"status":500, "message":"could not delete"})
   })
})


application.get('/v1/contact', function(req,res){
    contactmodel.contact.findAll({
        attributes: ['id','Name','email','Phoneno','Message']
    })
    .then(function(result){
        res.status(200);
        res.json(result);
    })
    .catch(function(err){
        
    })
})
// dd
application.get('/v1/reserve', function(req,res){
    reservemodel.reserve.findAll({
        attributes: ['id','fullname','email','phoneno','address','departure','destination','people']
    })
    .then(function(result){
        res.status(200);
        res.json(result);
    })
    .catch(function(err){
        
    })
})

application.get('/v1/users/:id', function(req, res) {

	usermodel.User.findOne({
			where: {
				id: req.params.id
			}
		})
		.then(function(result) {
			res.status(200);
			res.json(result)
		})
		.catch(function(err) {

		})
})


/**
 * @swagger
 * /v1/users/{id}:
 *   put:
 *     tags:
 *      - Users
 *     description: Updates a single user
 *     produces: application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          Firstname:
 *           type:string
 *          Lastname:
 *           type:string
 *          Phoneno:
 *           type:string
 *          username:
 *           type: string
 *          address:
 *           type:string
 *     responses:
 *       200:
 *         description: Successfully updated
 */



application.put('/v1/users/:id', function(req, res) {

	usermodel.User.update({
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Phoneno: req.body.Phoneno,
			username: req.body.username,
			address: req.body.address
		}, {
			where: {
				id: req.params.id
			}
		})
		.then(function(result) {
			res.status(201);
			res.send({
				"message": "User Edited succesfuly"
			})
		})
		.catch(function(err) {

		})
})



/**
 * @swagger
 * /v1/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

application.delete('/v1/users/:id',function(req,res,next){
   console.log(req.params.id)
   usermodel.User.destroy({
       where: {id : req.params.id}
   }) 
   .then(function(result){
       
    if (result == 1) {

        res.status(200)
        res.send({
            "message": "deleted succesfully"
        });
    } else {
        next({
            "status": 500,
            "message": "Couldnot delete"
        })

    }
   })
   .catch(function(err){
       next({"status":500, "message":"could not delete"})
   })
})



application.get('/v1/contact', function(req,res){
    contactmodel.contact.findAll({
        attributes: ['id','Name','email','Phoneno','Message']
    })
    .then(function(result){
        res.status(200);
        res.json(result);
    })
    .catch(function(err){
        
    })
})


application.get('/v1/contact/:id', function(req, res) {

    contactmodel.contact.findOne({
			where: {
				id: req.params.id
			}
		})
		.then(function(result) {
			res.status(200);
			res.json(result)
		})
		.catch(function(err) {

		})
})


/**
 * @swagger
 * /v1/contact/{id}:
 *   put:
 *     tags:
 *      - Contact
 *     description: Updates a single user
 *     produces: application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id
 *     - name: contact
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          Name:
 *           type:string
 *          email:
 *           type:string
 *          Phoneno:
 *           type:string
 *          Message:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 */

application.put('/v1/contact/:id', function(req, res) {

	contactmodel.contact.update({

        Name: req.body.Name,
        email: req.body.email,
        Phoneno: req.body.Phoneno,
        Message : req.body.Message,
			
		}, {
			where: {
				id: req.params.id
			}
		})
		.then(function(result) {
			res.status(201);
			res.send({
				"message": "Suggestion Edited succesfuly"
			})
		})
		.catch(function(err) {

		})
})





/**
 * @swagger
 * /v1/contact/{id}:
 *   delete:
 *     tags:
 *       - Contacts
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: contact's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
application.delete('/v1/contact/:id',function(req,res,next){
    console.log(req.params.id)
    contactmodel.contact.destroy({
        where: {id : req.params.id}
    }) 
    .then(function(result){
        
     if (result == 1) {
 
         res.status(200)
         res.send({
             "message": "deleted succesfully"
         });
     } else {
         next({
             "status": 500,
             "message": "Couldnot delete"
         })
 
     }
    })
    .catch(function(err){
        next({"status":500, "message":"could not delete"})
    })
 })





 application.get('/v1/reserve/:id', function(req, res) {

    reservemodel.reserve.findOne({
			where: {
				id: req.params.id
			}
		})
		.then(function(result) {
			res.status(200);
			res.json(result)
		})
		.catch(function(err) {

		})
})

/**
 * @swagger
 * /v1/reserve/{id}:
 *   put:
 *     tags:
 *      - Contacts
 *     description: Updates a single contact
 *     produces: application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id
 *     - name: reserve
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          fullname:
 *           type:string
 *          email:
 *           type:string
 *          phoneno:
 *           type:string
 *          address:
 *           type: string
 *          departure:
 *           type: string
 *          destination:
 *           type: string
 *          people:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 */

application.put('/v1/reserve/:id', function(req, res) {

	reservemodel.reserve.update({

        fullname: req.body.fullname,
        email: req.body.email,
        phoneno: req.body.phoneno,
        address : req.body.address,
        departure : req.body.departure,
        destination : req.body.destination,
        people : req.body.people,
			
		}, {
			where: {
				id: req.params.id
			}
		})
		.then(function(result) {
			res.status(201);
			res.send({
				"message": "Reservation Edited Succesfuly"
			})
		})
		.catch(function(err) {

		})
})






application.delete('/v1/reserve/:id',function(req,res,next){
    console.log(req.params.id)
    reservemodel.reserve.destroy({
        where: {id : req.params.id}
    }) 
    .then(function(result){
        
     if (result == 1) {
 
         res.status(200)
         res.send({
             "message": "deleted succesfully"
         });
     } else {
         next({
             "status": 500,
             "message": "Couldnot delete"
         })
 
     }
    })
    .catch(function(err){
        next({"status":500, "message":"could not delete"})
    })
 })

/**
* @swagger
* /v1/auth:
*   post:
*     tags:
*       - Users
*     name: Login
*     summary: Logs in a user
*     consumes:
*       - application/json
*     parameters:
*       - name: user
*         in: body
*         schema:
*           type: object
*           properties:
*             username:
*               type: string
*             password:
*               type: string
*         required:
*           - username
*           - password
*     responses:
*       200:
*         description: User found and logged in successfully
*       401:
*         description: Bad username, not found in db
*       403:
*         description: Username and password don't match
*/


application.post('/v1/auth', authController.validator, authController.check, authController.jwtTokenGen, function(req, res) {
console.log(req.genToken)
	res.status(200);
	res.send({
        "username": req.body.username,
        "password":req.body.password,
        // "result": result,
		"message": "Login success",
		"token": req.genToken
	})

	

})






application.use(function(err,req,res,next){
    res.status(err.status);
    res.send({"message":err.message})
})



var mystorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'resources/photo/locationphoto')
    },
    filename: function(req, file, cb) {
        var name = 'TravelBookingApp' + (Math.floor(100000 + Math.random() * 900000)) + file.originalname;
        cb(null, name);
        // console.log(name);
        req.testVall = name;
    }
});

var upload = multer({ storage: mystorage });



application.post('/user/add/locationphoto', upload.single('locationphoto'), function(req, res) {
    // console.log(req.testVall);
    // res.status(200);
    res.send({
        "status": 200,
        "message": "user photo registered",
        "name": req.testVall
    })
});











console.log('app running')

application.listen(3003);

module.exports = application;
