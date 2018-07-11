(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskFilesUpload', {
            templateUrl: 'src/shared/components/task-files-upload/task-files-upload.component.html',
            controller: taskFilesUploadController,
            controllerAs: 'ctrl',
        });

    taskFilesUploadController.$inject = ['taskService', '$stateParams', 'widgetState'];
    function taskFilesUploadController(taskService, $stateParams, widgetState) {
        var vm = this;
        vm.$onInit = $onInit;
        vm.tasklist = {};
        vm.files = [];
        vm.error = '';


        function $onInit() {
        }

        vm.uploadFiles = function() {
            console.log(vm.files);
        };
    }



})();