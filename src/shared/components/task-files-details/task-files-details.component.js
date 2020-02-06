(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskFilesDetails', {
            templateUrl: 'src/shared/components/task-files-details/task-files-details.component.html',
            controller: taskFilesDetailsController,
            controllerAs: 'ctrl',
        });

    taskFilesDetailsController.$inject = ['taskService', '$stateParams', 'widgetState', '$sessionStorage'];
    function taskFilesDetailsController(taskService, $stateParams, widgetState, $sessionStorage) {
        var vm = this;
        vm.$onInit = $onInit;
        vm.tasklist = {};
        vm.file = null;


        function $onInit() {
            if ($sessionStorage.files !== undefined) {
                for (var i = 0; i < $sessionStorage.files.length; i++) {
                    if ($sessionStorage.files[i].id === $stateParams.fileid) {
                        vm.file = $sessionStorage.files[i];
                        break;
                    }
                }
            }

        }


        vm.cancel = function () {
            widgetState.go('tasks.files', { listid: $stateParams.listid, taskid: $stateParams.taskid });
        };


        vm.delete = function () {
            widgetState.go('tasks.filedelete', { listid: $stateParams.listid, taskid: $stateParams.taskid, fileid: $stateParams.fileid });
        };
    }



})();