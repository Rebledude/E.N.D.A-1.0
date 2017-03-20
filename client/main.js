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

Template.challenge.helpers({
	puzzles: function(){
	if(Meteor.user().profile.score == 0){
		var img = 'imgTest.jpg';
		return img;
	}else if(Meteor.user().profile.score == 1){
		var img = 'imgTest2.jpg';
		return img;

	}
	else{
		console.log("nope");
	}
	}
})

Template.dashboard.helpers({
  name: function() {
    return Meteor.user().profile.name;
  }
});

Template.dashboard.onCreated(function dashboardOnCreated() {
	this.state = new ReactiveDict();
	Meteor.subscribe('users');
});


Template.leaderboard.helpers({
	players:function() {
		return Meteor.users.find();
	}
});

Avatar.setOptions({
  defaultImageUrl: "http://www.junaati.com/img/blog/avatar.png"
});

Template.posts.helpers({
	charsRemaining: function() {
		return Session.get('CharactersRemaining');
	}
});

Template.posts.onRendered(function() {
	$("#postForm").validate();
});

Template.posts.events({
	'keyup #inputPost': function(event) {
		var inputText = event.target.value;
		Session.set("CharactersRemaining", (140-inputText.length)+ "characters remaining");
	},
	'submit #postForm': function (event) {
		event.preventDefault();
		var post = event.target.inputPost.value;
		event.target.reset();
		Session.set("CharactersRemaining", 140 + "characters remaining");
		Meteor.call('insertPost',post);
	}	
});

Meteor.subscribe('userPosts');