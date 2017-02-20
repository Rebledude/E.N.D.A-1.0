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

Template.dashboard.helpers({
  name: function() {
    return Meteor.user().profile.name;
  }
});

Template.dashboard.helpers({
	picture: function() {
	return Meteor.user().profile.display_picture;
  }
});

Avatar.setOptions({
  defaultImageUrl: "http://www.junaati.com/img/blog/avatar.png"
});


