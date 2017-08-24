define(["require"], function(require) {
	requirejs.config({
		baseUrl : "js",
		
		paths : {
			"jquery"   : "jquery/jquery",
			"bootstrap": "bootstrap/bootstrap.min",
			"knockout" : "knockout/knockout",
			"socket.io": '/socket.io/socket.io',
			"feathers" : '//npmcdn.com/feathers-client@^2.0.0-pre.1/dist/feathers',
		},
	});
	
	requirejs(["jquery"], function (jquery) {
		requirejs(["bootstrap", "/app.js"]);
	}); 
});