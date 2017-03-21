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

Template.dashboard.onCreated(function dashboardOnCreated() {
	this.state = new ReactiveDict();
	Meteor.subscribe('users');
	Meteor.subscribe('userPosts');
<<<<<<< HEAD
	
=======
>>>>>>> e9ebd143c9d80d7d0eae8804a725692d5a527755
});


Template.leaderboard.helpers({
	players:function() {
<<<<<<< HEAD
		var Users = Meteor.users.find({}, {sort: {"profile.score":-1}});
		return Users.map(function(player, index){
		 	if(index===0)
				player.isFirst = true;
			else if(index===1)
				player.isSecond = true;
			else if(index===2)
				player.isThird = true;
			return player;
			
		});
=======
		return Meteor.users.find();
>>>>>>> e9ebd143c9d80d7d0eae8804a725692d5a527755
	}
});


Avatar.setOptions({
  defaultImageUrl: "http://www.junaati.com/img/blog/avatar.png"
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
});

Template.posts.helpers({
	charsRemaining: function() {
		return Session.get('CharactersRemaining');
	},
	posts:function(){
		return Posts.find({}, {sort: {date:-1}});
	},
<<<<<<< HEAD
	creator:function(user){
		var userd = Meteor.users.findOne(user);
		return userd.profile.name;
	},
=======
>>>>>>> e9ebd143c9d80d7d0eae8804a725692d5a527755
	timeDiff:function(postDate){
		var timeDiff = new Date().getTime()-postDate.getTime();
		var diffDays = Math.floor(timeDiff/(1000*3600*24));
		var diffHours = Math.floor(timeDiff/(1000*3600));
		var diffMins = Math.floor(timeDiff/(1000*60));
		var diffSecs = Math.floor(timeDiff/(1000));

		if(diffDays > 0)
			return("about "+diffDays+"d ago");
		else if(diffHours > 0)
			return("about "+diffHours+"h ago");
		else if(diffMins > 0)
			return("about "+diffMins+"m ago");
		else
			return(diffSecs + "s ago");

	}
});

Template.posts.onRendered(function() {
	$("#postForm").validate();
});

Template.posts.events({
	'keyup #inputPost': function(event) {
		var inputText = event.target.value;
<<<<<<< HEAD
		Session.set("CharactersRemaining", (140-inputText.length)+ " characters remaining...");
=======
		Session.set("CharactersRemaining", (140-inputText.length)+ "characters remaining");
>>>>>>> e9ebd143c9d80d7d0eae8804a725692d5a527755
	},
	'submit #postForm': function (event) {
		event.preventDefault();
		var post = event.target.inputPost.value;
		event.target.reset();
		Session.set("CharactersRemaining", 140 + "characters remaining");
		Meteor.call('insertPost',post);
	}	
});

