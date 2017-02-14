(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('detailPage', {
            templateUrl: 'src/1x1/components/detail-page/detail-page.component.html',
            controller: detailPageController,
            controllerAs: 'detailPageController'
        });

    detailPageController.$inject = ['widgetState', 'taskService', '$state'];
    function detailPageController(widgetState, taskService, $state) {
        var vm = this;
        vm.service = taskService;
        vm.$onInit = $onInit;

        function $onInit() {
            if (vm.service.getSelectedTask() === null || typeof vm.service.getSelectedTask() === 'undefined') {
                $state.go('task');
            }
            widgetState.setBackButtonState('task');
        }
    }

})();