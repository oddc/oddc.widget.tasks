(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('addPage', {
            templateUrl: 'src/1x1/components/add-page/add-page.component.html',
            controller: addPageController,
            controllerAs: 'ctrl'
        });

    addPageController.$inject = ['taskService', '$stateParams', 'widgetState'];
    function addPageController(taskService, $stateParams, widgetState) {
        var vm = this;
        vm.loading = true;
        vm.$onInit = $onInit

        function $onInit() {
            vm.loading = false;
            widgetState.setBackButtonState('tasks', {id: $stateParams.listid});
        }

    }

})();
