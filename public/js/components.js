define(['knockout', "socket.io", "feathers"], function(ko, io, feathers) {
	ko.components.register('login-form', {
	    viewModel: { require: 'components/login/login' },
	    template: { require: 'text!components/login/login.html' },
	}); 
	
	ko.components.register('login-nav', {
	    viewModel: { require: 'components/login/nav' },
	    template: { require: 'text!components/login/nav.html' },
	}); 	
	
	ko.components.register('flash', {
	    viewModel: { require: 'components/flash/flash' },
	    template: { require: 'text!components/flash/flash.html' },
	}); 		

	ko.components.register('rooms', {
		viewModel: { require: 'components/rooms/rooms' },
		template: { require: 'text!components/rooms/rooms.html' },
	}); 	
	
	ko.components.register('users', {
		viewModel: { require: 'components/users/users' },
		template: { require: 'text!components/users/users.html' },
	}); 		
	
	ko.components.register('roomlist', {
		viewModel: { require: 'components/rooms/roomlist' },
		template: { require: 'text!components/rooms/roomlist.html' },
	}); 		

	ko.components.register('roomeditor', {
		viewModel: { require: 'components/rooms/roomeditor' },
		template: { require: 'text!components/rooms/roomeditor.html' },
	}); 		
	
	var socket = io();
	var feathersClient = feathers()
    .configure(feathers.hooks())
    .configure(feathers.socketio(socket))
    .configure(feathers.authentication({ storage: window.localStorage }));
	
	return {
		'socket' : socket,
		'feathers' : feathersClient,
	};
});
