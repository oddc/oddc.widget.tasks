(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskFiles', {
            templateUrl: 'src/shared/components/task-files/task-files.component.html',
            controller: taskFilesController,
            controllerAs: 'ctrl',
        });

    taskFilesController.$inject = ['taskService', '$stateParams', 'widgetState', '$sessionStorage'];
    function taskFilesController(taskService, $stateParams, widgetState, $sessionStorage) {
        var vm = this;
        vm.$onInit = $onInit;
        vm.tasklist = {};
        vm.files = [];
        vm.error = '';
        vm.isLoading = true;


        function $onInit() {
            vm.error = '';
            taskService.readDocuments($stateParams.taskid).then(function (result) {
                if (result.error === undefined) {
                    vm.files = result;
                    $sessionStorage.files = result;
                }
                else {
                    vm.error = result.message;
                }
                vm.isLoading = false;
            });
        }


        vm.uploadFile = function () {
            widgetState.go('tasks.fileupload', { listid: $stateParams.listid, taskid: $stateParams.taskid });
        };

        vm.openFile = function (fileid) {
            widgetState.go('tasks.filesdetails', { listid: $stateParams.listid, taskid: $stateParams.taskid, fileid: fileid });
        };
    }



})();