var ImageModel = require('../Model/ImageModel');

function addImages(req, res, next) {
	ImageModel.SignDetails.create(
		{

			images: req.file.filename,
			description: req.body.description

		})
		.then(function (result) {
			console.log(result)
			next();
		})
		.catch(function (err) {
			next({ "status": 500, "message": "Database Error" });
			// console.log(err);s
		})

}
module.exports = {
	addImages
}
