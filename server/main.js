import { Meteor } from 'meteor/meteor';

  // code to run on server at startup
		Meteor.startup(function () {
 		Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://danu7.it.nuigalway.ie:8652/';
 	});
  	
  	Meteor.publish('users', function (){
  		return Meteor.users.find({}, {sort: {"profile.score":-1}});
  	});
  	
  	Meteor.publish('userPosts', function() {
 		return Posts.find();
 	});
 	
 	

Posts= new Mongo.Collection("posts");

Meteor.methods({
	'userInfo':function(name, bio, avatar){
		Meteor.users.update(this.userId, {
		  $set:{"profile.name":name,
			"profile.oldName":name,
			"profile.bio":bio,
			"profile.avatar":avatar
			},
		});
	},
	'settings':function(){
		Meteor.users.update(this.userId,{
			$set:{"profile.name": "null"},
		});
	},
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