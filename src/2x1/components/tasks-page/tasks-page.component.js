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
        vm.loading = true;
        vm.error = false;
        vm.errorMessage = null;
        vm.tasklist = {};
        vm.taskid = '';
        vm.$onInit = $onInit;


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


            widgetState.setBackButtonState('tasklist.view', { listid: '' });

            function onGetCurrentUserSuccess() {
                if (vm.service.getTasks().length === 0) {
                    return vm.service.requestTasks();
                }
            }

            function onGetTasklist() {
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


        vm.add = function () {
            if ($stateParams.listid !== '') {
                $state.go('tasks.task', {listid: $stateParams.listid, taskid: "new"});
            }
        };


        vm.newTask = function() {
            return $stateParams.taskid === 'new';
        };


        vm.noTask = function() {
            return $stateParams.taskid === undefined || $stateParams.taskid === '';
        };

    }

})();