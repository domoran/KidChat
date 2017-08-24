define(["knockout", "components"], function (ko, c) { 
	
	const Viewmodel = function () {
		var self = this; 
		
		this.currentUser = ko.observable(null);
		this.message = ko.observable(null); 
		this.currentPage = ko.observable(null); 
		
		this.showPage = function (page) {
			return !!self.currentUser();
		};
		
		this.pages = [
		              { name: "rooms", title: "Rooms" },
		              { name: "users", title: "Users" },
		]; 
		
		this.logout = function () { c.feathers.logout(); self.currentUser(null); }
	}
	
	$(document).ready(function () {
		ko.applyBindings(new Viewmodel());
	});

	
});

