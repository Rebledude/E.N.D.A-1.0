import { Meteor } from 'meteor/meteor';

  // code to run on server at startup
	Meteor.startup(function () {
		Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://danu7.it.nuigalway.ie:8629/';
	});
	
	Meteor.publish('users', function (){
		return Meteor.users.find({}, {sort: {"profile.score":-1}});
<<<<<<< HEAD
	});
	
	Meteor.publish('userPosts', function() {
		return Posts.find();
=======
>>>>>>> e9ebd143c9d80d7d0eae8804a725692d5a527755
	});
	
	

Posts= new Mongo.Collection("posts");

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

