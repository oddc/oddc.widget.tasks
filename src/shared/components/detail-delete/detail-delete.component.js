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

        vm.error = false;
        vm.errorMsg = '';

        vm.service = taskService;
        vm.deleteSelectedTask = deleteSelectedTask;
        vm.$onInit = $onInit;

        function $onInit() {
        }

        function deleteSelectedTask() {
            vm.service
                .deleteSelectedTask()
                .then(function (result) {

                    vm.errorMsg = typeof result.message === 'undefined' ? '' : result.message;;
                    vm.error    = typeof result.error === 'undefined' ? false : result.error;

                    if (!vm.error) {
                        $state.go('detail.view', {listid: $stateParams.listid, taskid: ''});
                    }

                });
        }
    }

})();