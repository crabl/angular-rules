module angularRules {
	class Rule {
		
	}
	
	class RuleEngine {
		rules: Array<Rule>;
		activeRules: Array<Rule>;
		
		constructor(rules: Array<Rule>) {
			this.rules = [];
			this.activeRules = [];
		}
	}
}