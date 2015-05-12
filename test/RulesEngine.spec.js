describe('Rules Engine', function () {
	
	var RuleEngine;
	
	beforeEach(module('angularRules.mocks'));
	beforeEach(module('angularRules'));
	
	beforeEach(inject(function (_RuleEngine_) {
		RuleEngine = _RuleEngine_;
	}));
	
	describe('constructor()', function () {
		it('clears the existing rules array', function () {
			expect(RuleEngine.activeRules.length).toBe(0);
		});
		
		
	});
	
	
});