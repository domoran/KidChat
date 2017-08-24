define(["knockout", "components"], function(ko, c) {
	
    function Viewmodel(params) {
    	var self = this; 
    	
    	this.name = ko.observable(""); 
    	this.activeRoom = params.activeRoom || ko.observable(); 
    	
    	c.feathers.service("room").on("created", function () {
    		console.log(arguments); 
    	});
    	
    	this.createRoom = function () {
    		c.feathers.service("room").create({ name: self.name() })
    		return false; 
    	};
    }
    
    return Viewmodel;
});