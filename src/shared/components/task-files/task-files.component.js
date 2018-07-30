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


        function $onInit() {
            widgetState.setBackButtonState('detail.view', { listid: $stateParams.listid });

            vm.error = '';
            taskService.readDocuments($stateParams.taskid).then(function (result) {
                if (result.error === undefined) {
                    vm.files = result;
                    $sessionStorage.files = result;
                }
                else {
                    vm.error = result.message;
                }
            });
        }


        vm.uploadFile = function () {
            widgetState.go('detail.fileupload');
        };

        vm.openFile = function (fileid) {
            widgetState.go('detail.filesdetails', { fileid: fileid});
        };
    }



})();