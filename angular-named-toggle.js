(function (angular) {
    'use strict';

    // Reference code:
    // https://github.com/nostalgiaz/bootstrap-switch
    // https://github.com/cgarvis/angular-toggle-switch

    var toggle = function ($scope) {
            $scope.toggle = function toggle() {
                if (!$scope.disabled) {
                    if ($scope.model === $scope.trueValue) {
                        $scope.model = $scope.falseValue;
                    } else {
                        $scope.model = $scope.trueValue;
                    }
                }
                $scope.onChange();
            };
        };

    angular.module('ng')
    .directive('toggleSwitch', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                model: '=?',
                disabled: '=?',
                onLabel: '=?',
                offLabel: '=?',
                trueValue: '=?',
                falseValue: '=?',
                knobLabel: '=?',
                onChange: '&'
            },
            template:
                '<div class="co-toggle" ng-click="toggle()" ng-class="{ disabled: disabled }">' +
                    '<div class="switch-animate" ng-class="{coActive: model === trueValue}">' +
                        '<span class="switch-left">{{onLabel}}</span>' +
                        '<span class="knob">{{knobLabel}}</span>' +
                        '<span class="switch-right">{{offLabel}}</span>' +
                    '</div>' +
                    '<span class="switch-min">{{largeText}}</span>' +
                '</div>',
            controller: toggle,
            link: function(scope) {
                scope.onLabel = scope.onLabel || "On";
                scope.offLabel = scope.offLabel || "Off";
                scope.knobLabel = scope.knobLabel || "\u00a0";
                scope.trueValue = scope.trueValue || true;
                scope.falseValue = scope.falseValue || false;

                var longest = [
                        scope.onLabel, scope.knobLabel, scope.offLabel
                    ].sort(function (a, b) { return b.length - a.length; })[0];

                scope.largeText = longest + longest + 'buffer';
            }
        };
    })

    .directive('iosToggle', function () {
        return {
            template: '<div class="ios-toggle" ng-click="toggle()" ng-class="{coActive: model === trueValue, disabled: disabled}"></div>',
            replace: true,
            restrict: 'EA',
            controller: toggle,
            scope: {
                model: '=?',
                disabled: '=?',
                trueValue: '=?',
                falseValue: '=?',
                onChange: '&'
            },
            link: function ($scope, $element) {
                scope.trueValue = scope.trueValue || true;
                scope.falseValue = scope.falseValue || false;
            }
        };
    });

}(this.angular));
