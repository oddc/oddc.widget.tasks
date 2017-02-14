(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('detailDelete', {
            templateUrl: 'src/shared/components/detail-delete/detail-delete.component.html',
            controller: detailDeleteController,
            controllerAs: 'detailDeleteController'
        });

    detailDeleteController.$inject = ['widgetState', 'taskService', '$state'];
    function detailDeleteController(widgetState, taskService, $state) {
        var vm = this;
        vm.service = taskService;
        vm.deleteSelectedTask = deleteSelectedTask;
        vm.$onInit = $onInit;

        function $onInit() {
            if (vm.service.getColumns() < 2) {
                widgetState.setBackButtonState('task');
            }
        }

        function deleteSelectedTask() {
            vm.service
                .deleteSelectedTask()
                .then(onDeleteSelectedTaskSuccess);

            function onDeleteSelectedTaskSuccess() {
                $state.go('task');
            }
        }
    }

})();