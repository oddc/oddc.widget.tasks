(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('detailDelete', {
            templateUrl: 'src/shared/components/detail-delete/detail-delete.component.html',
            controller: detailDeleteController,
            controllerAs: 'detailDeleteController'
        });

    detailDeleteController.$inject = ['widgetState', 'taskService', '$state', '$stateParams'];
    function detailDeleteController(widgetState, taskService, $state, $stateParams) {
        var vm = this;
        vm.service = taskService;
        vm.deleteSelectedTask = deleteSelectedTask;
        vm.$onInit = $onInit;

        function $onInit() {
        }

        function deleteSelectedTask() {
            vm.service
                .deleteSelectedTask()
                .then(onDeleteSelectedTaskSuccess);

            function onDeleteSelectedTaskSuccess() {
                $state.go('detail.view', { listid: $stateParams.listid, taskid: '' });
            }
        }
    }

})();