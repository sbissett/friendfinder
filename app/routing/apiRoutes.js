// Import the list of friend entries
var friends = require("../data/friends.js");

// Exports API routes
// Search for Specific Friend (or all friends) - provides JSON
module.exports = function(app) {

    // Total list of friend entries
    app.get('/api/friends', function(req, res){
		res.json(friends);
	});  

    // Add new friend entry, when user completes survey - takes in JSON input
    app.post('/api/friends', function(req, res){

		// We will use this object to hold the "best match". We will constantly update it as we 
		// loop through all of the options 
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

        // Here we take the result of the user's survey POST and parse it.
		var userData 	= req.body;
		var userName 	= userData.name;
		var userPhoto 	= userData.photo;
		var userScores 	= userData.scores;

        // This variable will calculate the difference between the user's scores and the scores of
		// each user in the database
		var totalDifference = 0;

        // Loops through all existing friends in the list
        for  (var i=0; i< friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			// We then loop through all the scores of each friend
			for (var j=0; j< friends[i].scores[j]; j++){

                // We calculate the difference between the scores and sum them into the totalDifference
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
				
				console.log(totalDifference);
				// If the sum of differences is less then the differences of the current "best match"
				if (totalDifference <= bestMatch.friendDifference){

					// Reset the bestMatch to be the new friend. 
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}
    
        // Add new user into list of friends
        friends.push(userData);

        // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page. 
		res.json(bestMatch);

	});

}