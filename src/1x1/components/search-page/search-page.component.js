(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('searchPage', {
            templateUrl: 'src/1x1/components/search-page/search-page.component.html',
            controller: searchPageController,
            controllerAs: 'ctrl'
        });

    searchPageController.$inject = ['taskService', 'widgetState', '$stateParams', '$state'];
    function searchPageController(taskService, widgetState, $stateParams, $state) {
        var vm = this;
        vm.service = taskService;
        vm.$onInit = $onInit;

        function $onInit() {

        }

        vm.back = function () {
            widgetState.go('tasklist.view', {listid: ''});
        };


        vm.showBtn = function () {
            return $state.current.name === 'search.result';
        };

    }

})();