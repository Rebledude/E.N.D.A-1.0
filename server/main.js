import { Meteor } from 'meteor/meteor';

  // code to run on server at startup
		Meteor.startup(function () {
 		Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://danu7.it.nuigalway.ie:8629/';
		smtp = {
    		username: 'theendaproject@gmail.com',   // eg: server@gentlenode.com
    		password: 'whitewall69',   // eg: 3eeP1gtizk5eziohfervU
    		server:   'smtp.gmail.com',  // eg: mail.gandi.net
    		port: 25
  		}

  		process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
	});
  	
  	Meteor.publish('users', function (){
  		return Meteor.users.find({}, {sort: {"profile.score":-1}});
  	});
  	
  	Meteor.publish('userPosts', function() {
 		return Posts.find();
 	});
 	
 	

Posts= new Mongo.Collection("posts");
Puzzles = new Mongo.Collection("puzzels");

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
	'puzzleCheck':function(answer){
		var check = null;
		check = Meteor.users.findOne({},{"_id":this.userId}).profile.score;
		var code = Puzzles.find({},{"number":0}).answer;
		switch(answer){
			case ("FnzVcs6H"):
					if (Meteor.user().profile.score==0){
						Meteor.call('updateScore');}
					break;
			case 'V5m9kqSM':
				if (Meteor.user().profile.score==1){
						Meteor.call('updateScore');}
					break;
			case 'KrzADf66':
				if (Meteor.user().profile.score==2){
						Meteor.call('updateScore');}
					break;
			case '9PqBCghm':
				if (Meteor.user().profile.score==3){
						Meteor.call('updateScore');}
					break;
			case 'YE3Lu8jg':
				if (Meteor.user().profile.score==4){
						Meteor.call('updateScore');}
					break;
			default:
				console.log("Error with button submit")
		};
	},
	'updateScore':function(){
		Meteor.users.update(this.userId,{
			$inc:{"profile.score": 1},
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