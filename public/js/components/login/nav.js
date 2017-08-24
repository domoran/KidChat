define(["knockout", "components"], function(ko, c) {
	function Viewmodel(params) {
		var self = this; 
		
		this.currentUser = params.currentUser || ko.observable(); 
		this.ready = ko.observable(false); 
		this.message = params.message || ko.observable(); 
		
		this.logout = function () { c.feathers.logout(); self.currentUser(null); }
	};

	return Viewmodel;
});