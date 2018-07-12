(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskFilesDetails', {
            templateUrl: 'src/shared/components/task-files-details/task-files-details.component.html',
            controller: taskFilesDetailsController,
            controllerAs: 'ctrl',
        });

    taskFilesDetailsController.$inject = ['taskService', '$stateParams', 'widgetState'];
    function taskFilesDetailsController(taskService, $stateParams, widgetState) {
        var vm = this;
        vm.$onInit = $onInit;
        vm.tasklist = {};
        vm.files = [];


        function $onInit() {
        }


        vm.download = function () {
            console.log('downlaod');
        };


        vm.cancel = function () {
            widgetState.go('taskedit.files');
        };

    }



})();