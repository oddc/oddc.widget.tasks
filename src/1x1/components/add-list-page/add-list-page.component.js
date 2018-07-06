(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('addListPage', {
            templateUrl: 'src/1x1/components/add-list-page/add-list-page.component.html',
            controller: addListPage,
            controllerAs: 'ctrl'
        });

    addListPage.$inject = ['taskService', '$stateParams', 'widgetState'];
    function addListPage(taskService, $stateParams, widgetState) {
        var vm = this;
        vm.loading = true;
        vm.$onInit = $onInit

        function $onInit() {
            vm.loading = false;
            widgetState.setBackButtonState('tasklist', {id: $stateParams.listid});
        }

    }

})();
