Template.navigation.events({
	'click .logout': function(event){
		event.preventDefault();
	Meteor.logout(function(error) {
		if(error) {
			console.log("Error: " + error.reason);
		}
	});
	}
});


