const clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey : 'b1cb178095bf41d7892a4e050d3d6f70'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => res.status(400).json('unable to work with api'));
};

const handleEntries = (req, res, db) => {
	const {id} = req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then((entries) => {
			res.json(entries[0]);
		})
		.catch((err) => res.status(400).json('unable to get entries'));
};

module.exports = {
	handleEntries,
	handleApiCall
};
