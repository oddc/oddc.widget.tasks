(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('editPage', {
            templateUrl: 'src/1x1/components/edit-page/edit-page.component.html',
            controller: editPageController,
            controllerAs: 'ctrl'
        });

    editPageController.$inject = ['$stateParams', 'widgetState'];
    function editPageController($stateParams, widgetState) {
        var vm = this;
        vm.loading = true;
        vm.$onInit = $onInit

        function $onInit() {
            vm.loading = false;
            widgetState.setBackButtonState('tasks', {id: $stateParams.listid});
            widgetState.go('taskedit.view');
        }

    }

})();
