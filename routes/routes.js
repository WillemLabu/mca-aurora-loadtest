var AuroraManager = require('../lib/aurora');

var appRouter = function(app) {

	app.get('/', function(req, res) {
		res.send('<a href="GetDefaultConfiguration?country=Nigeria&businessunit=dstv&interfacetype=DStv%20Facebook%20and%20Mobi">Query the db</a>');
	});

	app.get('/GetDefaultConfiguration', function(req, res) {

		// Make sure we have the proper params
		// We need at least: country, businessunit, interfacetype
		if (!req.query.country)
			return res.send({ 'code': 403, 'error': true, 'message': 'Please provide a Country.' });
		if (!req.query.businessunit)
			return res.send({ 'code': 403, 'error': true, 'message': 'Please provide proper Business Unit.' });
		if (!req.query.interfacetype)
			return res.send({ 'code': 403, 'error': true, 'message': 'Please provide a proper Interface Type.' });

		// Query the DB
		var db = new AuroraManager('localhost', 'root', '', 'vsc_cone');
		db.connect();

		var query = 'SELECT * FROM `table 1` WHERE `CountryName` = "' + req.query.country +
					'" AND `BusinessUnit` = "' + req.query.businessunit +
					'" AND `interfaceType` = "' + req.query.interfacetype + '"';

		db.queryPromise(query)
		.then((r) => {
			db.disconnect();
			return res.send(r);
		});
	});

}

module.exports = appRouter;