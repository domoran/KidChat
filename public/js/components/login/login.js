define(["knockout", "components"], function(ko, c) {
	
    function LoginFormViewModel(params) {
    	var self = this; 

        this.currentUser = params.currentUser || ko.observable(null);
        this.ready 		 = params.ready || ko.observable(false); 
        this.message     = params.message || ko.observable();

        this.username = ko.observable(''); 
        this.password = ko.observable('');
        this.repeat_password = ko.observable('');
        this.register = ko.observable(false); 
        
        this.verifyToken = function (token) {
        	return c.feathers.passport.verifyJWT(token)
    	   .then(payload => {
    		   return c.feathers.service('users').get(payload.userId);
    	   })
    	   .then(user => {
    		   c.feathers.set('user', user);
    		   self.currentUser(user);
    		   self.ready(true);
    	   });
        };
        
        this.checkStoredToken = function () {
        	 // authenticate
            c.feathers.authenticate()
            .then(function (response) {
            	return self.verifyToken(response.accessToken); 
            })
            .catch(function (error) {
            	self.currentUser(null); 
            	self.ready(true);
            });
        };
        
        this.valid = ko.computed( function () {
        	var r = self.register(); 
        	var v = self.password() == self.repeat_password(); 
        	var e = self.password() && self.username();
        	return (e && (!r || v));
        });
        
        this.doLogin = function () {
        	if (self.register()) {
        		c.feathers.service('users').create({
        			email: self.username(),
        			password: self.password(),
        		}).then(function(response) {
        			self.register(false); 
        			self.doLogin();
        		}).catch(function(error) {
        			self.message(error); 
        		});
        	} else {
        		c.feathers.authenticate({
        			'strategy' : 'local', 
        			'email' : self.username(),
        			'password': self.password(),
        		}).then(function(response) {
        			return self.verifyToken(response.accessToken); 
        		}).catch(function(error) {
        			self.message(error.message); 
        		});
        	}
        	
        	return false; 
        };
        
        this.checkStoredToken();
    }
    
    return LoginFormViewModel;
});