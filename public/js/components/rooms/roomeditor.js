define(["knockout", "components"], function(ko, c) {
	
    function Viewmodel(params) {
    	var self = this; 
    	
    	this.id   = ko.observable();
    	this.name = ko.observable(); 
    	this.callback = params.onSave;
    	
    	this.room = params.room || ko.observable({}); 
    	
    	this.room.subscribe(function (room) {
    		if (room) {
    			self.name( room.name ); 
    			self.id( room._id ); 
    		} else {
    			self.name(""); 
    			self.id(""); 
    		}
    	});
    	
    	this.saveRoom = function () {
    		self.room({
    			'_id': self.id(), 
    			'name': self.name(), 
    		});
    		
    		c.feathers.service("room")
    		.update(self.id(), self.room())
    		.then(function (response) {
    			console.log("Save Success!", response); 
    		})
    		.catch(function (error) {
    			console.log("Error", error); 
    		});
    		
    	};
    	
    	this.deleteRoom = function (room) {
    		c.feathers.service("room")
    		.remove(self.id())
    		.then(function(response) {
    			console.log("Room deleted!", response);
    		})
    		.catch(function (error) {
    			console.log("Error deleting room!", error);
    		})
    	};
    }
    
    return Viewmodel;
});