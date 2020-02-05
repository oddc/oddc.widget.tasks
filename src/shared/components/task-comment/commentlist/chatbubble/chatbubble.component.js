(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .directive('oddcChatBubble', chatBubbleDirective);

    function chatBubbleDirective() {
        return {
            restrict: 'A',
            templateUrl: 'src/shared/components/task-comment/commentlist/chatbubble/chatbubble.component.html',
            controller: chatBubbleController,
            controllerAs: 'chatbubble',
            bindToController: true,
            scope: {
                message: '='
            },
            link: linkFunction
        };
    }

    chatBubbleController.$inject = ['$scope'];
    function chatBubbleController($scope) {
        $scope.direction = 'in';
    }

    linkFunction.$inject = ['scope', 'elements', 'attributes'];
    function linkFunction(scope, elements, attributes) {
        scope.$watch(attributes.class, watchClass);

        function watchClass() {
            scope.direction = (elements.hasClass('out')) ? 'out' : 'in';
        }
    }

})();