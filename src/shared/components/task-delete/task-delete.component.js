(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskDelete', {
            templateUrl: 'src/shared/components/task-delete/task-delete.component.html',
            controller: detailDeleteController,
            controllerAs: 'detailDeleteController'
        });

    detailDeleteController.$inject = ['widgetState', 'taskService', '$state', '$stateParams'];
    function detailDeleteController(widgetState, taskService, $state, $stateParams) {
        var vm = this;

        vm.error = false;
        vm.errorMsg = '';

        vm.service = taskService;
        vm.$onInit = $onInit;

        function $onInit() {
        }

        vm.deleteSelectedTask = function() {
            vm.service
                .deleteSelectedTask()
                .then(function (result) {

                    vm.errorMsg = typeof result.message === 'undefined' ? '' : result.message;;
                    vm.error    = typeof result.error === 'undefined' ? false : result.error;

                    if (!vm.error) {
                        $state.go('tasks', {listid: $stateParams.listid});
                    }

                });
        };


        vm.cancel = function () {
            $state.go('tasks.task', {listid: $stateParams.listid, taskid: $stateParams.taskid});
        };
    }

})();