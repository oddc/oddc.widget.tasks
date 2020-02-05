(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('tasks', {
            templateUrl: 'src/shared/components/tasks/tasks.component.html',
            controller: tasksController,
            controllerAs: 'tasklist'
        });

    tasksController.$inject = ['taskService', '$stateParams', 'widgetState', '$sessionStorage'];
    function tasksController(taskService, $stateParams, widgetState, $sessionStorage) {
        var self = this;
        self.service = taskService;
        self.iderror = false;
        self.error   = '';
        self.tasklist = {};
        self.currentUser = {};
        self.tasks = [];
        self.isLoading = true;

        widgetState.setBackButtonState('tasklist.view', {listid: ''});


        self.$onInit = function() {
            console.log('TTT');

            if($stateParams.listid === '' || $stateParams.listid === undefined) {
                self.iderror = true;
                self.isLoading = false;
            }
            else {
                self.currentUser = taskService.getCurrentUser();
                if (self.currentUser.error) {
                    taskService.requestCurrentUser().then(function (user) {
                        self.currentUser = user;
                        loadTasklist();
                    });
                }
                else {
                    loadTasklist();
                }
            }
        };


        // tasks
        // indexpage.service.getTasks()


        // selectedTask
        // indexpage.service.getSelectedTask()


        self.onClosedTasksVisibilityChange = function(visibility) {
            self.service.setClosedTasksVisibility(visibility);
        };


        self.onStatusChange = function($task) {
            $task.$task.state = !$task.$task.open ? 'done' : 'open';

            self.service
                .updateTask($task.$task)
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
            widgetState.go('tasks.task', { listid: self.tasklist.id, taskid: task.$task.id });
        };


        function loadTasklist() {
            if ($sessionStorage.tasklist === undefined || $sessionStorage.tasklist === null) {
                taskService.readTaskList($stateParams.listid).then(function (result) {
                    $sessionStorage.tasklist = result;
                    if (result.error === undefined) {
                        taskService.setTasks(result.tasks);
                        self.tasklist = $sessionStorage.tasklist;
                        self.tasks = self.tasklist.tasks;
                        self.isLoading = false;
                    }
                });
            }
            else {
                self.tasklist = $sessionStorage.tasklist;
                self.tasks = self.tasklist.tasks;
                self.isLoading = false;
            }
        }



        self.canDelete = function() {
            return (!self.tasklist.privateList && !self.tasklist.teamList && !self.tasklist.projectGroupList && self.currentUser.openId === self.tasklist.admin);
        };


        self.delete = function () {
            widgetState.go('tasks.listdelete', { listid: $stateParams.listid });
        };
    }

})();