

Accounts.onCreateUser(function(options, user){
	user.profile = options.profile || {};
	user.profile.score = 0;
	 if (options.profile) {
        //options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
   	}
	return user;
	
});
