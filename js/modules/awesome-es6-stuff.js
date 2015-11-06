//http://www.es6fiddle.net/
var es6Tests = (function() {
	return {
		testArrow : function () {
			let square = x => x * x;
			let add = (a, b) => a + b;
			let pi = () => 3.1415;

			console.log(square(5));
			console.log(add(3, 4));
			console.log(pi());
		},
		blockScope : function (){
			var x = 0;

			for (let i = 0; i < 10; i++) {
			    x += 10;
			}

			try {
				console.log(i);
			} catch(e) {
				console.log(
					'i does not exist here!'
				);
			}

		},
		classesAndInheritance: function (){
			class Polygon {
				constructor(height, width) { //class constructor
					this.name = 'Polygon';
					this.height = height;
					this.width = width;
				}

				sayName() { //class method
					console.log('Hi, I am a', this.name + '.');
				}
			}

			class Square extends Polygon {
				constructor(length) {
					super(length, length); //call the parent method with super
					this.name = 'Square';
				}

				get area() { //calculated attribute getter
					return this.height * this.width;
				}
			}

			let s = new Square(5);

			s.sayName();
			console.log(s.area);

		},

		defaultParameters: function () {

			function sayMsg(msg='This is a default message.') {
				console.log(msg);
			}

			sayMsg();
			sayMsg('This is a different message!');

		},

		destructuredAssignment: function () {
			let [one, two] = [1, 2];
			let {three, four} = {three: 3, four:  4};

			console.log(one, two, three, four);
		},

		generators : function () {
			function* range(start, end, step) {
				while (start < end) {
					yield start;
					start += step;
				}
			}

			for (let i of range(0, 10, 2)) {
				console.log(i);
			}

		},

		iterators : function () {
			let arr = [1, 2, 3, 4, 5];
			let sum = 0;

			for (let v of arr) {
				sum += v;
			}

			console.log('1 + 2 + 3 + 4 + 5 =', sum);
		},

		map : function () {

			let x = new Map([[1, 'is a number key']]);
			let today = new Date()

			//anything can be a key
			x.set(today.toString(), 111)
			x.set(today, 222);
			x.delete(today.toString());

			console.log('The map contains', x.size, 'elements.');
			console.log('The map has a today Date key:', x.has(today));
			console.log('The map has a today string key:', x.has(today.toString()));

			//values and keys
			x.forEach((value, key, map) => console.log(value, key, map));

			//iterable
			for (let value of x) {
			  console.log(value);
			}

			//iterable values
			for (let value of x.values()) {
			  console.log(value);
			}

			//iterable keys
			for (let value of x.keys()) {
			  console.log(value);
			}

			//iterable entries (key, value)
			for (let value of x.entries()) {
			  console.log(value);
			}

		},

		promises : function () {
			var longFn = function() {
				return new Promise(function(res, rej) {
					setTimeout(res, 1000);
				});
			};

			var coolFn = function() {
				console.log('cool');
			};

			// logs cool after 1 second
			longFn().then(coolFn);

		},

		restParameters : function () {

			function format(str, ...args) {
				return str.replace(/\{\s*(\d+)\s*\}/g, function(m, n) {
					return args[n];
				});
			}

			let msg = format(
				'The {0}st arg is a string, the {1} are {2}.',
				1,
				'rest',
				'unknown'
			);

			console.log(msg);

		},

		set : function (){

			let x = new Set([1, 2, 3, 4, 4, 4, 5]);

			x.add(6);
			x.delete(2);

			console.log('The set contains', x.size, 'elements.');
			console.log('The set has 1:', x.has(1));
			console.log('The set has 8:', x.has(8));

			//values and keys are the same in a set
			x.forEach((value, key, set) => console.log(value, key, set));

			//iterable
			for (let value of x) {
			  console.log(value);
			}

			//iterable values
			for (let value of x.values()) {
			  console.log(value);
			}

			//iterable keys
			for (let value of x.keys()) {
			  console.log(value);
			}

			//iterable entries (key, value)
			for (let value of x.entries()) {
			  console.log(value);
			}
		},

		spreadOperators: function () {

			function add(a, b) {
				return a + b;
			}

			let nums = [5, 4];

			console.log(add(...nums));

		},

		templateLiters : function () {
			let person = {name: 'John Smith'};
			let tpl = `My name is ${person.name}.`;

			console.log(tpl);
		},

		init: function() {
			this.testArrow();
			this.blockScope();
		}
	};
})();
