define(["knockout", "components"], function(ko, c) {
	
    function Viewmodel(params) {
    	var self = this;
    	
    	this.rooms = ko.observableArray(); 
    	this.activeRoom = params.activeRoom || ko.observable();
    	this.status = ko.observable();
    	
    	this.selectRoom = function(room) { 
    		self.activeRoom(room);
    	};

    	this.loadRooms = function () {    	
    		console.log("Loading rooms!");
    		self.activeRoom(null); 
        	c.feathers.service("room").find()
        	.then(function (response) {
        		console.log("Room Data:", response);
        		self.rooms(response.data);
        	})
        	.catch(function(error) {
        		self.status("An error occurred: " + error); 
        	})
    	};
    	
    	c.feathers.service('room').on('created', self.loadRooms);
    	c.feathers.service('room').on('updated', self.loadRooms);
    	c.feathers.service('room').on('patched', self.loadRooms);
    	c.feathers.service('room').on('removed', self.loadRooms);
    	
    	this.loadRooms(); 
    }
    
    return Viewmodel;
});