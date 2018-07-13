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

    tasklistController.$inject = ['taskService', '$stateParams', 'widgetState'];
    function tasklistController(taskService, $stateParams, widgetState) {
        var self = this;
        self.service = taskService;
        self.iderror = false;
        self.error   = '';
        self.tasklist = {};
        self.currentUser = {};
        self.tasks = [];
        self.isLoading = true;

        if($stateParams.listid === '') {
            self.iderror = true;
            self.isLoading = false;
        }
        else {
            self.currentUser = taskService.getCurrentUser();

            taskService.readTaskList($stateParams.listid).then(function (r) {
               self.tasklist = r;
               self.tasks = self.tasklist.tasks;
               self.isLoading = false;
            });
        }


        self.canDelete = function() {
            return (!self.tasklist.privateList && !self.tasklist.teamList && !self.tasklist.projectGroupList && self.currentUser.openId === self.tasklist.admin);
        };


        self.delete = function () {
            widgetState.go('deletetasklist', { id: $stateParams.listid });
        };
    }

})();