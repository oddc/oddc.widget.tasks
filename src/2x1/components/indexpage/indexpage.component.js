(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('indexPage', {
            templateUrl: 'src/2x1/components/indexpage/indexpage.component.html',
            controller: indexPageController,
            controllerAs: 'indexpage'
        });

    indexPageController.$inject = ['$log', '$state', 'taskService', 'widgetState', 'eventService'];
    function indexPageController($log, $state, taskService, widgetState, eventService) {
        var vm = this;
        vm.service = taskService;
        vm.tasks = [];
        vm.newTask = '';
        vm.loading = true;
        vm.error = false;
        vm.errorMessage = null;
        vm.$onInit = $onInit;
        vm.addTask = addTask;
        vm.onStatusChange = onStatusChange;
        vm.onSelectTask = onSelectTask;
        vm.onClosedTasksVisibilityChange = onClosedTasksVisibilityChange;

        eventService.addEventListener();

        function $onInit() {
            vm.service.setColumns(2);
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

            widgetState.setBackButtonState(null);

            function onGetCurrentUserSuccess() {
                if (vm.service.getTasks().length === 0) {
                    return vm.service.requestTasks();
                }
            }

            function onRequestTasksSuccess() {
                if (vm.service.getSelectedTask() === null) {
                    vm.service.selectFirstTask();
                }
                if (vm.service.getSelectedTask() !== null) {
                    vm.loading = false;
                    vm.error = false;
                    vm.errorMessage = null;
                    $state.go('detail.view', {id: vm.service.getSelectedTask().id});
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
            $state.go('detail.view', { id: task.$task.id });
        }
    }

})();