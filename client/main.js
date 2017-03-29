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
  },
  bio: function() {
	return Meteor.user().profile.bio;
  }
});

Template.dashboard.events({
	'click #settings': function(){
		Meteor.call('settings')
	}
});

Template.dashboard.onCreated(function dashboardOnCreated() {
	this.state = new ReactiveDict();
	Meteor.subscribe('users');
	Meteor.subscribe('userPosts');
	
});

Template.posts.onRendered(function() {
  $("[data-toggle]").click(function() {
    var toggle_el = $(this).data("toggle");
    $(toggle_el).toggleClass("open-sidebar");
  });
});

Template.profile.helpers({
	charsRemaining: function() {
		return Session.get('CharactersRemaining');
	}
});
Template.profile.events({
	'submit #signUp': function(event){
		event.preventDefault();
		var name=event.target.nameAsk.value;
		var bio=event.target.bioAsk.value;
		var avatar=event.target.linkAsk.value;
		event.target.reset();
		Session.set("CharactersRemaining", 200 + "characters remaining");
		if(name!=""){
			Meteor.call('userInfo', name, bio, avatar)
		}
		else{
			var c = document.getElementById('nameAsk');
			c.className += ' warning';
		}
	},
	'keyup #bioAsk': function(event) {
		var inputText = event.target.value;
		Session.set("CharactersRemaining", (200-inputText.length)+ " characters remaining...");
	}
});

Template.leaderboard.helpers({
	players:function() {
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
	}
});


Avatar.setOptions({
  defaultImageUrl: "http://www.junaati.com/img/blog/avatar.png"
});

Template.home.helpers({
	name:function(){
		if(Meteor.user().profile.name == 'null'){
			return false;
		}else{
			return true;
		}
	}
});

Template.challenge.helpers({
	puzzles: function(){
 	switch(Meteor.user().profile.score){
		case 0:
 			var img = 'g.png';
 			return img;
 		case 1:
 			var img = '44.png';
 			return img;
		case 2:
 			var img = 'la.jpg';
 			return img;
		case 3:
 			var img = 'smacs.jpg';
 			return img;
		case 4:
 			var img = 'spch.png';
 			return img;
 		default:
 			console.log("error with puzzles");
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
	creator:function(user){
		var userd = Meteor.users.findOne(user);
		return userd.profile.name;
	},
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
		Session.set("CharactersRemaining", (140-inputText.length)+ " characters remaining...");
	},
	'submit #postForm': function (event) {
		event.preventDefault();
		var post = event.target.inputPost.value;
		event.target.reset();
		Session.set("CharactersRemaining", 140 + "characters remaining");
		if(post == ''){
			console.log("error")
		}else{
			Meteor.call('insertPost',post);
		}
	}	
});