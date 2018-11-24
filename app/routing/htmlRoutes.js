//Dependencies
var path = require('path');

// Routes to HTML files
// =============================================================

module.exports = function(app) {
// Basic route that sends the user first to the AJAX Page

// Home Page 
    app.get("/", function(req, res) { 
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });

    // Survey page
    app.get('/survey', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});
}