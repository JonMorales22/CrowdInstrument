var assert = require('assert');

/*
there are 4 different ways to bind the this keyword:
	-implicit
	-explicit
	-new
	-window
*/

// IMPLICIT BINDING
// ex1):

var me = {
	name: 'tyler',
	age: 25,
	sayName: function() {
		console.log(this.name)
	}
}

me.sayName(); //<---- look to the left of the function, the THIS keywork references this obj


// ex2):

//this function takes in an obj and adds the sayName function to it.
var sayNameMixin = function(obj) {
  obj.sayName = function() {
    console.log(this.name);
  }
}

var me = {
	name: 'Jon',
  age: 24
}

var you = {
	name: 'Popo',
  age: 20
}

sayNameMixin(me);  // <--- adds the sayName function to the me obj
sayNameMixin(you); // <--- adds the sayName function to the you obj


assert(me.sayName === 'Jon');
assert(me.sayName === 'Popo');


