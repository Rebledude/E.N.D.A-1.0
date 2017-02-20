import { Meteor } from 'meteor/meteor';


  // code to run on server at startup
	Meteor.startup(function () {
		Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://danu7.it.nuigalway.ie:8629/';
	});
	
	Meteor.publish('users', function (){
		return Meteor.users.find();
	});
	
	

var Users = Meteor.users;

