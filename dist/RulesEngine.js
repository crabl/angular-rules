var angularRules;
(function (angularRules) {
    var Rule = (function () {
        function Rule() {
        }
        return Rule;
    })();
    var RuleEngine = (function () {
        function RuleEngine(rules) {
            this.rules = [];
            this.activeRules = [];
        }
        return RuleEngine;
    })();
})(angularRules || (angularRules = {}));
