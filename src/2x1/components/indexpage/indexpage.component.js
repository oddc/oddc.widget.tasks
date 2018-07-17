(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('indexPage', {
            templateUrl: 'src/2x1/components/indexpage/indexpage.component.html',
            controller: indexPageController,
            controllerAs: 'indexpage'
        });

    indexPageController.$inject = ['$log', '$state', 'taskService', 'widgetState', 'eventService', '$timeout'];
    function indexPageController($log, $state, taskService, widgetState, eventService, $timeout) {
        var vm = this;
        vm.service = taskService;
        vm.tasks = [];
        vm.newTask = '';
        vm.loading = true;
        vm.error = false;
        vm.errorMessage = null;
        vm.tasklist = null;
        vm.$onInit = $onInit;

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


        vm.onSelectTasklist = function(id) {
            taskService.readTaskList(id).then(function (result) {
                vm.tasklist = result;
                taskService.setTasks([]);
                $timeout(function () {
                    taskService.setTasks(result.tasks);
                });

                $state.go('task', { listid: vm.tasklist.id });
            });
        };


        vm.addNewList = function () {
            console.log('######newlist');
        };
    }

})();