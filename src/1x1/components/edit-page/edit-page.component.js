(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('editPage', {
            templateUrl: 'src/1x1/components/edit-page/edit-page.component.html',
            controller: editPageController,
            controllerAs: 'ctrl'
        });

    editPageController.$inject = ['$stateParams', 'widgetState', '$state', 'taskService', '$scope'];
    function editPageController($stateParams, widgetState, $state, taskService, $scope) {
        var vm = this;
        vm.state = $state;
        vm.loading = true;
        vm.tasklist = null;
        vm.$onInit = $onInit

        function $onInit() {
            vm.loading = false;
            loadTasklist();
        }


        function loadTasklist() {
            taskService.readTaskList($stateParams.listid).then(function (result) {
                vm.tasklist = result;
            });
        }


        vm.add = function () {
            if ($stateParams.listid !== '') {
                $state.go('detail.edit', {listid: $stateParams.listid, taskid: "new"});
            }
        };

    }

})();
