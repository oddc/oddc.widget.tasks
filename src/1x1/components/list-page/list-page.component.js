(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('taskListPage', {
            templateUrl: 'src/1x1/components/list-page/list-page.component.html',
            controller: taskListPageController,
            controllerAs: 'tasklistpage'
        });

    taskListPageController.$inject = ['$log', 'taskService', '$state'];
    function taskListPageController($log, taskService, $state) {
        var vm = this;
        vm.loading = false;
        vm.error = false;
        vm.errorMessage = null;
        vm.service = taskService;
        vm.$onInit = $onInit;
        vm.addTask = addTask;
        vm.onStatusChange = onStatusChange;
        vm.onClosedTasksVisibilityChange = onClosedTasksVisibilityChange;
        vm.onSelectTask = onSelectTask;

        function $onInit() {
            if (vm.service.getCurrentUser() === null) {
                vm.loading = true;
                vm.service
                    .requestCurrentUser()
                    .then(onGetCurrentUserSuccess)
                    .then(onRequestTasksSuccess)
                    .catch(OnError)
                    .finally(onDone);
            } else {
                vm.loading = false;
            }

            function onGetCurrentUserSuccess() {
                if (vm.service.getTasks().length === 0) {
                    return vm.service.requestTasks();
                }
            }

            function onRequestTasksSuccess() {
                vm.error = false;
                vm.errorMessage = null;
            }

            function OnError(error) {
                vm.error = true;
                $log.error(error);
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
                    .then(onCreateTaskSuccess)
                    .catch(onCreateTaskError);
            }

            function onCreateTaskSuccess(result) {
                vm.service.addTask(result);
                vm.newTask = '';
            }

            function onCreateTaskError(error) {
                $log.error(error);
            }
        }

        function onStatusChange(task) {
            vm.service
                .updateTask(task)
                .catch(onUpdateTaskError);

            function onUpdateTaskError(error) {
                $log.error(error);
            }
        }

        function onClosedTasksVisibilityChange(visibility) {
            vm.service.setClosedTasksVisibility(visibility);
        }

        function onSelectTask(task) {
            vm.service.setSelectedTask(task.$task);
            $state.go('detail.view', { id: task.$task.id });
        }
    }

})();
