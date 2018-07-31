(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('taskListPage', {
            templateUrl: 'src/1x1/components/list-page/list-page.component.html',
            controller: taskListPageController,
            controllerAs: 'ctrl'
        });

    taskListPageController.$inject = ['taskService', 'eventService', 'widgetState', '$timeout', '$state'];
    function taskListPageController(taskService, eventService, widgetState, $timeout, $state) {
        var vm = this;
        vm.loading = false;
        vm.error = false;
        vm.errorMessage = null;
        vm.state = $state;

        eventService.addEventListener();


        vm.openNewList = function () {
            widgetState.go('task.add');
        };


        vm.goToList = function () {
            $state.go('task', {listid: ''});
        };


        vm.onSelectTasklist = function(errorStr) {
            vm.errorStr = errorStr
        };


    }

})();
