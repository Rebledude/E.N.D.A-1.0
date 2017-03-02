import { Meteor } from 'meteor/meteor';


  // code to run on server at startup
	Meteor.startup(function () {
		Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://danu7.it.nuigalway.ie:8629/';
	});
	
	Meteor.publish('users', function (){
		return Meteor.users.find({},{sort:{score: -1}});
	});
	
	

var Users = Meteor.users;

Meteor.methods({
	'insertPost':function(post){
		Posts.insert(
			{
				post:post,
				date: new Date(),
				createdBy: this.userId,
				likes:{
					totalLikes:0,
					users:[]
				},
				retweets:{
					totalRetweets:0,
					users:[]
				}
			},
			function(error, result){
				if(error) console.log (error);
				if(result) console.log (result);
			}
		);
	}
});

Meteor.publish('userPosts', function() {
	return Posts.find();
});

