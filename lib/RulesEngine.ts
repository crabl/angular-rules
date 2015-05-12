/// <reference path="../.tmp/typings/tsd.d.ts" />

module angularRules {
	export class Rule {
		on: boolean;
		priority: number;
		
		condition () {
			
		}
		
		consequence () {
			
		}
	}
	
	export class Fact {
		result: boolean;
		
		constructor(fact?: Fact) {
			if (fact) {
				this.result = fact.result;
			}
		}
	}
	
	class RuleEngine {
		static $inject = ['rules'];
		
		rules: Array<Rule>;
		activeRules: Array<Rule>;
		
		constructor(rules: Array<Rule>) {
			this.rules = rules;
			this.activeRules = [];
		}
		
		sync(): void {
			// Filters out all inactive rules; if a rule does not
			// have an 'on' value, it assigns 'on' to be true.
			this.activeRules = this.rules.filter((rule) => {
				if (typeof rule.on === 'undefined') {
					rule.on = true;
				}
				
				return rule.on;
			});
			
			// Sort the active rules according to their priority
			this.activeRules.sort((a, b) => {
				if (a.priority && b.priority) {
					return b.priority - a.priority;
				}
				
				return 0;
			});
		}
		
		execute(fact: Fact, callback: Function) {
			var complete: boolean = false;
			fact.result = true;
			
			var session = new Fact(fact);
			var lastSession = new Fact(fact);
			
			var _rules: Array<Rule> = this.activeRules;
			
			(function ProcessRules(i: number) {
				
				var API = {
					'restart': function () {
						return ProcessRules(0);
					},
					'stop': function () {
						complete = true;
						return ProcessRules(0);
					},
					'next': function () {
						if (lastSession !== session) {
							lastSession = new Fact(session);
							API.restart();
						} else {
							return ProcessRules(i + 1);
						}
					},
					'when': function (outcome: boolean) {
						if (outcome) {
							_rules[i].consequence.call(session, API);
						} else {
							API.next();
						}
					}
				};
				
				if (i < _rules.length && !complete) {
					var _condition: Function = _rules[i].condition;
					_condition.call(session, API);
				} else {
					return callback(session);
				}
				
			}(0));
		}
		
	}
	
	angular
		.module('angularRules', [])
		.service('RuleEngine', RuleEngine);
}

module angularRules {
	class Rules {
		constructor() {
			return [1];
		}
		
	}
	
	angular
		.module('angularRules.mocks', [])
		.service('rules', Rules)
}