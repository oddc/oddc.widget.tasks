(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskView', {
            templateUrl: 'src/shared/components/task-view/task-view.component.html',
            controller: taskViewController,
            controllerAs: 'ctrl',
        });

    taskViewController.$inject = [];
    function taskViewController() {
        var vm = this;

    }



})();