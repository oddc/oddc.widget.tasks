(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('oddcTasklist', {
            templateUrl: 'src/shared/components/tasklist/tasklist.component.html',
            controller: tasklistController,
            controllerAs: 'tasklist',
            bindings: {
                tasks: '<',
                selectedTask: '<',
                onClosedTasksVisibilityChange: '&',
                onSelectTask: '&',
                onStatusChange: '&'
            }
        });

    tasklistController.$inject = ['taskService'];
    function tasklistController(taskService) {
        this.service = taskService;
    }

})();