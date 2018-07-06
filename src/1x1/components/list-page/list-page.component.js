(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('taskListPage', {
            templateUrl: 'src/1x1/components/list-page/list-page.component.html',
            controller: taskListPageController,
            controllerAs: 'ctrl'
        });

    taskListPageController.$inject = ['taskService', 'eventService', 'widgetState'];
    function taskListPageController(taskService, eventService, widgetState) {
        var vm = this;
        vm.loading = false;
        vm.error = false;
        vm.errorMessage = null;

        eventService.addEventListener();

        function $onInit() {
            vm.loading = true;
        }

        vm.openNewList = function () {
            widgetState.go('addtasklist');
        };

    }

})();
