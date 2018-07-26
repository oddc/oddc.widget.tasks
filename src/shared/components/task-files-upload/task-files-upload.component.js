(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskFilesUpload', {
            templateUrl: 'src/shared/components/task-files-upload/task-files-upload.component.html',
            controller: taskFilesUploadController,
            controllerAs: 'ctrl',
        });

    taskFilesUploadController.$inject = ['taskService', '$stateParams', 'widgetState', 'Upload'];
    function taskFilesUploadController(taskService, $stateParams, widgetState, Upload) {
        var vm = this;
        vm.$onInit = $onInit;
        vm.tasklist = {};
        vm.file = [];
        vm.error = '';
        vm.updateSuccess = false;
        vm.isUploading = false;
        vm.progress = 0;



        function $onInit() {
        }

        vm.uploadFiles = function() {
            vm.updateSuccess = false;
            vm.filename = vm.file.name;
            vm.isUploading = true;
            Upload.upload({
                url: 'http://crm-test.optadata.com:8080/odone.fileserver/upload',
                autoUpload: true,
                data: {
                    type: 'taskattachement',
                    taskId: $stateParams.taskid,
                    file: vm.file
                },
                resumeChunkSize: 1000000 // 1MB
            }).then(function (resp) {
                vm.isUploading = false;
                vm.progress = 0;

                console.log(resp);
                if (resp.status === 200 && resp.data.result === 'success') {
                    saveUpload(resp);
                }

            }, function () {
                vm.isUploading = false;
                vm.progress = 0;
                console.log(error);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                vm.progress = progressPercentage;
            });
        };


        function saveUpload(resp) {
            var task = taskService.getSelectedTask();
            task['documentId'] = resp.data.documentId;

            taskService.updateTask(task).then(function (result) {
                vm.updateSuccess = true;
            });

        }
    }



})();