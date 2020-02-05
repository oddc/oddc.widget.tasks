(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskDelete', {
            templateUrl: 'src/shared/components/task-delete/task-delete.component.html',
            controller: detailDeleteController,
            controllerAs: 'detailDeleteController'
        });

    detailDeleteController.$inject = ['widgetState', 'taskService', '$state', '$stateParams', '$sessionStorage'];
    function detailDeleteController(widgetState, taskService, $state, $stateParams, $sessionStorage) {
        var vm = this;

        vm.error = false;
        vm.errorMsg = '';

        vm.service = taskService;
        vm.$onInit = $onInit;
        vm.tasklist = $sessionStorage.tasklist;

        function $onInit() {
        }

        vm.deleteSelectedTask = function() {
            vm.service
                .deleteSelectedTask()
                .then(function (result) {

                    vm.errorMsg = typeof result.message === 'undefined' ? '' : result.message;;
                    vm.error    = typeof result.error === 'undefined' ? false : result.error;

                    if (!vm.error) {
                        for (var i = 0; i < vm.tasklist.tasks.length; i++) {
                            if (vm.tasklist.tasks[i].id === $stateParams.taskid) {
                                vm.tasklist.tasks.splice(i, 1);
                                break;
                            }
                        }

                        $state.go('tasks.task', {listid: $stateParams.listid, taskid: ''});
                    }

                });
        };


        vm.cancel = function () {
            $state.go('tasks.task', {listid: $stateParams.listid, taskid: $stateParams.taskid});
        };
    }

})();