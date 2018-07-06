(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('tasklistDelete', {
            templateUrl: 'src/shared/components/tasklist-delete/tasklist-delete.component.html',
            controller: tasklistDeleteController,
            controllerAs: 'ctrl'
        });

    tasklistDeleteController.$inject = ['$stateParams', 'taskService', 'widgetState'];
    function tasklistDeleteController($stateParams, taskService, widgetState) {
        var self = this;
        self.error = "";
        self.tasklist = null;


        widgetState.setBackButtonState('tasks', { id: $stateParams.id });
        taskService.readTaskList($stateParams.id).then(function (result) {
            self.tasklist = result;
        });


        self.cancel = function () {
            widgetState.go('tasks', { id: $stateParams.id });
        };


        self.delete = function () {
            self.error = "";
            taskService.deleteTaskList($stateParams.id).then(function () {
                widgetState.go('tasklist');
            }, function () {
                self.error = "Beim löschen der Liste ist ein Fehler aufgetreten!";
            });
        };
    }

})();