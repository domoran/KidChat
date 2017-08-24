define(["knockout", "components"], function(ko, c) {
	
    function Viewmodel(params) {
    	var self = this; 
    	
    	this.time     = params.time || 5000; 
    	this.messages = ko.observableArray([]);
    	this.timers   = ko.observableArray([]); 
    	
    	params.message.subscribe(function (msg) {
    		if (msg) {
    			self.messages.push(msg); 
    			params.message(null); 
    			setTimeout(function () {
    				self.messages.pop();
    			},self.time);
    		}
    	});
    }
    
    return Viewmodel;
});