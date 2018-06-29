(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskAdd', {
            templateUrl: 'src/shared/components/task-add/task-add.component.html',
            controller: taskAddController,
            controllerAs: 'ctrl'
        });

    taskAddController.$inject = ['widgetState', 'taskService', '$state'];
    function taskAddController(widgetState, taskService, $state) {
        var vm = this;
        vm.service = taskService;
        vm.$onInit = $onInit;

        function $onInit() {

        }
    }

})();