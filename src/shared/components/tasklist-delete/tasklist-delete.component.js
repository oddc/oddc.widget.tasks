(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('tasklistDelete', {
            templateUrl: 'src/shared/components/tasklist-delete/tasklist-delete.component.html',
            controller: tasklistDeleteController,
            controllerAs: 'ctrl'
        });

    tasklistDeleteController.$inject = ['$stateParams', 'taskService', 'widgetState', '$sessionStorage'];
    function tasklistDeleteController($stateParams, taskService, widgetState, $sessionStorage) {
        var self = this;
        self.error = "";
        self.tasklist = $sessionStorage.tasklist;


        widgetState.setBackButtonState('tasklist.view', { listid: '' });


        self.cancel = function () {
            widgetState.go('tasks', { listid: $stateParams.listid });
        };


        self.delete = function () {
            self.error = "";
            taskService.deleteTaskList($stateParams.listid).then(function () {
                widgetState.go('tasklist.view', { listid: '' });
            }, function () {
                self.error = "Beim löschen der Liste ist ein Fehler aufgetreten!";
            });
        };
    }

})();