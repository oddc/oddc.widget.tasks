(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('detailPage', {
            templateUrl: 'src/1x1/components/detail-page/detail-page.component.html',
            controller: detailPageController,
            controllerAs: 'detailPageController'
        });

    detailPageController.$inject = ['widgetState', 'taskService', '$stateParams'];
    function detailPageController(widgetState, taskService, $stateParams) {
        var vm = this;
        vm.service = taskService;
        vm.isLoading = true;
        vm.title = '';
        vm.$onInit = $onInit;

        function $onInit() {
            console.log('task => ', vm.service.getSelectedTask());

            if (vm.service.getSelectedTask() === null || typeof vm.service.getSelectedTask() === 'undefined') {
                loadTitle();
            }
            else if(vm.service.getSelectedTask().id !== $stateParams.id) {
                loadTitle();
            }
            else {
                vm.title = vm.service.getSelectedTask().title;
                vm.isLoading = false;
            }
            widgetState.setBackButtonState('tasks', {id: 'hallo'});
        }


        function loadTitle() {
            vm.service.requestTask($stateParams.id)
                .then(function (result) {
                    vm.title = result.title;
                    vm.isLoading = false;
                })
                .catch(function (error) {
                    $log.error(error);
                    vm.isLoading = false;
                });
        }
    }

})();