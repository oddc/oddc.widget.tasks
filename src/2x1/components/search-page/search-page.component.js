(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('searchPage', {
            templateUrl: 'src/2x1/components/search-page/search-page.component.html',
            controller: searchPageController,
            controllerAs: 'ctrl'
        });

    searchPageController.$inject = ['taskService', 'widgetState', '$stateParams'];
    function searchPageController(taskService, widgetState, $stateParams) {
        var vm = this;
        vm.service = taskService;
        vm.$onInit = $onInit;

        function $onInit() {

        }


        vm.back = function () {
            widgetState.go('tasklist.view', {listid: ''});
        };

    }

})();