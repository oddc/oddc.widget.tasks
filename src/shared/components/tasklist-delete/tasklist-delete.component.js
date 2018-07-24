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


        widgetState.setBackButtonState('tasks', { listid: $stateParams.listid });
        taskService.readTaskList($stateParams.listid).then(function (result) {
            self.tasklist = result;
        });


        self.cancel = function () {
            widgetState.go('task.edit', { listid: $stateParams.listid });
        };


        self.delete = function () {
            self.error = "";
            taskService.deleteTaskList($stateParams.listid).then(function () {
                widgetState.go('task.edit', { listid: '' });
            }, function () {
                self.error = "Beim löschen der Liste ist ein Fehler aufgetreten!";
            });
        };
    }

})();