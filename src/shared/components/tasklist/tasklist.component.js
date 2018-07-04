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

    tasklistController.$inject = ['taskService', '$stateParams'];
    function tasklistController(taskService, $stateParams) {
        var self = this;
        self.service = taskService;
        self.iderror = false;
        self.error   = '';
        self.tasklist = {};
        self.currentUser = {};

        if($stateParams.id === '') {
            self.iderror = true;
        }
        else {
            self.currentUser = taskService.getCurrentUser();

            taskService.readTaskList($stateParams.id).then(function (r) {
               self.tasklist = r;
            });
        }


        self.canDelete = function() {
            return (!self.tasklist.privateList && !self.tasklist.teamList && self.currentUser.openId === self.tasklist.admin);
        };


        self.delete = function () {
            taskService.deleteTaskList($stateParams.id).then(function (r) {
               if (!r.error) {
                   self.error = '';
               }
               else {
                   self.error = 'Löschen der List: ' + r.message;
               }
            });
        };
    }

})();