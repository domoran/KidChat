define(["knockout", "components"], function(ko, c) {
	function User(user) {
		this.id    = ko.observable(user._id || ""); 
		this.email = ko.observable(user.email || ""); 
		this.role  = ko.observable(user.role || "user"); 
		this.selected = ko.observable(false); 
	}
	
	
    function Viewmodel(params) {
    	var self = this; 
    	
    	this.email = ko.observable(""); 
    	this.activeRoom = params.activeRoom || ko.observable(); 
    	this.users = ko.observableArray([]); 
    	this.currentUser = params.currentUser || ko.observable();
    	this.selectedUsers = params.selectedUsers || ko.observableArray([]);
    	this.select = params.selectMode || 'single';
    	
    	this.clickUser = function (user) {
    		if (ko.unwrap(self.select) == 'single') {
    			ko.utils.arrayMap(self.users(), function(u) { u.selected(false); });
    		}
    		 user.selected(!user.selected());
    		 
    		 var users = ko.utils.arrayFilter(self.users(), function(u) { return u.selected() });
    		 self.selectedUsers(users); 
    	};
    	
    	this.loadUsers = function () {
    		c.feathers.service("users").find()
    		.then(function (response) {
    			
    			self.users(response.data.map(function (x) { return new User(x); })); 
    		}).
    		catch(function (error) {
    			console.log("Error loading users", error); 
    		});
    	};
    	
    	this.deleteUser = function (user) {
    		console.log("Deleting user!", user); 
    		c.feathers.service("users")
    		.remove(user.id())
    		.then(function (response) {
    			console.log("Deleted user!", response);
    		})
    		.catch(function (error) {
    			console.log("Error when deleting user:", error); 
    		});
    	};
    	
    	this.createUser = function() {
    		console.log("Creating user"); 
    	}
    	
    	c.feathers.service("users").on("created", this.loadUsers); 
    	c.feathers.service("users").on("removed", this.loadUsers); 
    	c.feathers.service("users").on("updated", this.loadUsers); 
    	c.feathers.service("users").on("patched", this.loadUsers); 
    	
    	this.loadUsers();
    }
    
    return Viewmodel;
});