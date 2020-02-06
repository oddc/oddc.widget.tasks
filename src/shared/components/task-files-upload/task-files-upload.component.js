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
        vm.api = '';


        function $onInit() {
            var apiUrls = {
                DEV: 'http://wildfly.optadata.com:8080',
                TEST: 'https://widgetservice.test.optadata-one.de',
                PROD: 'https://widgetservice.optadata-one.de'
            };

            vm.api = apiUrls[CONFIG.ENV];
        }


        vm.uploadFiles = function() {
            if (vm.file === null) return;

            vm.updateSuccess = false;
            vm.filename = vm.file.name;
            vm.isUploading = true;
            Upload.upload({
                url: vm.api + '/odone.fileserver/upload',
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

                if (resp.status === 200 && resp.data.result === 'success') {
                    saveUpload(resp);
                }

            }, function () {
                vm.isUploading = false;
                vm.progress = 0;
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