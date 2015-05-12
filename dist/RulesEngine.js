/// <reference path="../.tmp/typings/tsd.d.ts" />
var angularRules;
(function (angularRules) {
    'use strict';
    var Rule = (function () {
        function Rule() {
        }
        Rule.prototype.condition = function () {
            return;
        };
        Rule.prototype.consequence = function () {
            return;
        };
        return Rule;
    })();
    angularRules.Rule = Rule;
    var Fact = (function () {
        function Fact(fact) {
            if (fact) {
                this.result = fact.result;
                this.province = fact.province;
                this.gst_hst_rate = fact.gst_hst_rate;
            }
        }
        return Fact;
    })();
    angularRules.Fact = Fact;
    var RuleEngine = (function () {
        function RuleEngine() {
            this.rules = [];
            this.activeRules = [];
        }
        RuleEngine.prototype.init = function (rules) {
            this.rules = rules;
            this.sync();
        };
        RuleEngine.prototype.sync = function () {
            // Filters out all inactive rules; if a rule does not
            // have an 'on' value, it assigns 'on' to be true.
            this.activeRules = this.rules.filter(function (rule) {
                if (typeof rule.on === 'undefined') {
                    rule.on = true;
                }
                return rule.on;
            });
            // Sort the active rules according to their priority
            this.activeRules.sort(function (a, b) {
                if (a.priority && b.priority) {
                    return b.priority - a.priority;
                }
                return 0;
            });
        };
        RuleEngine.prototype.execute = function (fact, callback) {
            var complete = false;
            fact.result = true;
            var session = new Fact(fact);
            var lastSession = new Fact(fact);
            var _rules = this.activeRules;
            (function ProcessRules(i) {
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
                        }
                        else {
                            return ProcessRules(i + 1);
                        }
                    },
                    'when': function (outcome) {
                        if (outcome) {
                            console.log(outcome);
                            _rules[i].consequence.call(session, API);
                        }
                        else {
                            API.next();
                        }
                    }
                };
                if (i < _rules.length && !complete) {
                    var _condition = _rules[i].condition;
                    _condition.call(session, API);
                }
                else {
                    return callback(session);
                }
            }(0));
        };
        RuleEngine.$inject = ['rules'];
        return RuleEngine;
    })();
    angular.module('angularRules', []).factory('RuleEngine', function () {
        return RuleEngine;
    });
})(angularRules || (angularRules = {}));
var angularRules;
(function (angularRules) {
    'use strict';
    var Rules = (function () {
        function Rules() {
            return [1];
        }
        return Rules;
    })();
    angular.module('angularRules.mocks', []).service('rules', Rules);
})(angularRules || (angularRules = {}));
var angularRules;
(function (angularRules) {
    'use strict';
    var SampleService = (function () {
        function SampleService(RulesEngine) {
            return this;
        }
        SampleService.$inject = ['RulesEngine', 'TaxRules'];
        return SampleService;
    })();
})(angularRules || (angularRules = {}));
