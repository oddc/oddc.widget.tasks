(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('tasksPage', {
            templateUrl: 'src/2x1/components/tasks-page/tasks-page.component.html',
            controller: tasksPageController,
            controllerAs: 'ctrl'
        });

    tasksPageController.$inject = ['$log', '$state', 'taskService', 'widgetState', '$stateParams'];
    function tasksPageController($log, $state, taskService, widgetState, $stateParams) {
        var vm = this;
        vm.service = taskService;
        vm.tasks = [];
        vm.newTask = '';
        vm.loading = true;
        vm.error = false;
        vm.errorMessage = null;
        vm.tasklist = {};
        vm.taskid = '';
        vm.$onInit = $onInit;
        vm.addTask = addTask;
        vm.onStatusChange = onStatusChange;
        vm.onSelectTask = onSelectTask;
        vm.onClosedTasksVisibilityChange = onClosedTasksVisibilityChange;


        function $onInit() {
            vm.taskid = $stateParams.taskid;
            vm.service.setColumns(2);

            vm.service
                .requestCurrentUser()
                .then(onGetCurrentUserSuccess)
                .then(onGetTasklist)
                .then(onRequestTasksSuccess)
                .catch(OnError)
                .finally(onDone);


            widgetState.setBackButtonState('task');

            function onGetCurrentUserSuccess() {
                if (vm.service.getTasks().length === 0) {
                    return vm.service.requestTasks();
                }
            }

            function onGetTasklist() {
                console.log('listid', $stateParams.listid);
                return vm.service.readTaskList($stateParams.listid).then(function (result) {
                    vm.tasklist = result;
                    return vm.tasklist;
                });
            }

            function onRequestTasksSuccess() {
                if (vm.service.getSelectedTask() === null) {
                    vm.service.selectFirstTask();
                }
                if (vm.service.getSelectedTask() !== null) {
                    vm.loading = false;
                    vm.error = false;
                    vm.errorMessage = null;
                    //$state.go('detail.view', {id: vm.service.getSelectedTask().id});
                }
            }

            function OnError(error) {
                $log.error(error);
                vm.error = true;
                if (error.data === null && error.status === -1) {
                    vm.errorMessage = 'Es konnte keine Verbindung zum Server aufgebaut werden.';
                }
            }

            function onDone() {
                vm.loading = false;
            }
        }

        function addTask(title) {
            if (typeof title != 'undefined' && title.length) {
                var task = { title: title };
                vm.service
                    .createTask(task)
                    .catch(onCreateTaskError)
                    .finally(onCreateTaskDone);
            }
            function onCreateTaskError(error) {
                $log.error(error);
            }

            function onCreateTaskDone() {
                vm.newTask = '';
            }
        }

        function onStatusChange($task) {
            console.log('onStatusChange($task): ', $task.title);
            vm.service
                .updateTask($task)
                .then(onUpdateTaskSuccess)
                .catch(onUpdateTaskError);

            function onUpdateTaskSuccess(result) {
                $task.modifiedAt = Date.now();
            }

            function onUpdateTaskError(error) {
                $log.error(error);
            }
        }

        function onClosedTasksVisibilityChange(visibility) {
            vm.service.setClosedTasksVisibility(visibility);
        }

        function onSelectTask(task) {
            vm.service.setSelectedTask(task.$task);
            $state.go('detail.view', { taskid: task.$task.id });
        }

        vm.add = function () {
            if ($stateParams.listid !== '') {
                $state.go('detail.view', {listid: $stateParams.listid, taskid: "new"});
            }
        };

    }

})();