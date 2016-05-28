// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var PythonShell = require('python-shell');
var app        = express();

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3000; // set our port

// ROUTES FOR OUR API
// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the Titanic Prediction API!' });	
});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

router.route('/titanic')

	// 
	.post(function(req, res) {
			
		var array = JSON.parse(req.body.args);
		
		var options = {
		  mode: 'text',
		  scriptPath: 'scripts',
		  args: array
		};

		PythonShell.run('script.py', options, function (err, results) {
		  if (err) throw err;
		  // results is an array consisting of messages collected during execution
		  if (results[0]=="[0]"){
		  	res.json({ message : 'Dead !' });
		  }
		  else {
		  	res.json({ message : 'Survived !' });
		  }
		});
		

		
	});


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);









	