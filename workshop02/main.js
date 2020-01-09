const range = require('express-range')
const compression = require('compression')

const express = require('express')

const CitiesDB = require('./citiesdb');

//Load application keys
//Rename _keys.json file to keys.json
const keys = require('./keys.json')

console.info(`Using ${keys.mongo}`);

const db = CitiesDB({  
	connectionUrl: keys.mongo, 
	databaseName: 'cities', 
	collectionName: 'cities'
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start of workshop

const API_URI = '/api'
// Mandatory workshop
// TODO GET /api/states
app.get(`${API_URI}/states`, (req, resp) => {
	console.log("In method states");
	 resp.type('application/json');
	 db.findAllStates()
	 .then(result => {
		 resp.status(200).json(result);
	 }).catch(error => {
		 resp.status(400).json({error: error});
	 }) 
});



// TODO GET /api/state/:state
app.get(`${API_URI}/state/:state`, (req,res) => {
	res.type('application/json');
})




// TODO GET /api/city/:cityId
app.get(`${API_URI}/city/:cityId`, (req,res) => {
	console.log("In method cityId");
	res.type('application/json');
	db.findCityById(req.params.cityId)
	.then(result => {
		res.status(200).json(result);
	}).catch(error => {
		res.status(400).json({error: error});
	})
})


// TODO POST /api/city




// Optional workshop
// TODO HEAD /api/state/:state
// IMPORTANT: HEAD must be place before GET for the
// same resource. Otherwise the GET handler will be invoked



// TODO GET /state/:state/count



// TODO GET /city/:name



// End of workshop

db.getDB()
	.then((db) => {
		const PORT = parseInt(process.argv[2] || process.env.APP_PORT) || 3000;

		console.info('Connected to MongoDB. Starting application');
		app.listen(PORT, () => {
			console.info(`Application started on port ${PORT} at ${new Date()}`);
		});
	})
	.catch(error => {
		console.error('Cannot connect to mongo: ', error);
		process.exit(1);
	});
