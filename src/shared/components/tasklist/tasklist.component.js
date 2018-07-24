(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('oddcTasklist', {
            templateUrl: 'src/shared/components/tasklist/tasklist.component.html',
            controller: tasklistController,
            controllerAs: 'tasklist'
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


        // tasks
        // indexpage.service.getTasks()


        // selectedTask
        // indexpage.service.getSelectedTask()


        self.onClosedTasksVisibilityChange = function(visibility) {
            vm.service.setClosedTasksVisibility(visibility);
        };


        self.onStatusChange = function($task) {
            self.service
                .updateTask($task)
                .then(onUpdateTaskSuccess)
                .catch(onUpdateTaskError);

            function onUpdateTaskSuccess(result) {
                $task.modifiedAt = Date.now();
            }

            function onUpdateTaskError(error) {
                $log.error(error);
            }
        };



        self.onSelectTask = function(task) {
            self.service.setSelectedTask(task.$task);
            widgetState.go('detail.view', { listid: self.tasklist.id, taskid: task.$task.id });
        };



        if($stateParams.listid === '' || $stateParams.listid === undefined) {
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
            widgetState.go('task.delete', { id: $stateParams.listid });
        };
    }

})();