'use strict';

describe('Rules Engine', function () {
	
	var RuleEngine;
	var rules = [{
		condition: function (R) {
			R.when(this.province === 'BC');
		},
		consequence: function (R) {
			this.gst_hst_rate = 0.05;
			R.next();
		}
	}];

	
	beforeEach(module('angularRules.mocks'));
	beforeEach(module('angularRules'));
	
	beforeEach(inject(function (_RuleEngine_) {
		RuleEngine = _RuleEngine_;
	}));
	
	describe('sync()', function () {
		it('filters out all the active rules, and assigns them to an array', function () {
			
		});
	});
	
	describe('execute()', function () {
		
	});
	
	describe('integration test', function () {
		
		it('executes a query against the rule engine', function () {
			var engine = new RuleEngine(rules);
			var fact = {
				province: 'BC'
			};
			
			engine.execute(fact, function (result) {
				expect(fact.gst_hst_rate).toBe(0.05);
			});
		});
	});
	
	
});

/*


var engine = new RuleEngine(rules);

var fact = {
	province: 'BC'
};

engine.execute(fact, function (result) {
	console.log(result);
});

*/