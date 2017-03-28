Accounts.onCreateUser(function(options, user){
	
	user.profile = options.profile || {};
	user.profile.score = 0;
	if(user.emails != null){
		user.profile.name = 'null';
	}
   	
	return user;
	
});