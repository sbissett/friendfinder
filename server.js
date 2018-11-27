// Dependencies
// =============================================================
var express = require('express');


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing. You tell express to parse data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(express.json({type:'application/vnd.api+json'}));


//Tried to add css files to server
app.use(express.static(('public')));


//=====================================================================
// ROUTER

require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  