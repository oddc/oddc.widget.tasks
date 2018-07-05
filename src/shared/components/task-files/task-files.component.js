(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskFiles', {
            templateUrl: 'src/shared/components/task-files/task-files.component.html',
            controller: taskFilesController,
            controllerAs: 'ctrl',
        });

    taskFilesController.$inject = ['taskService', '$stateParams'];
    function taskFilesController(taskService, $stateParams) {
        var vm = this;
        vm.service = taskService;
        vm.$onInit = $onInit;
        vm.tasklist = {};
        vm.isLoading = true;


        function $onInit() {

        }
    }



})();