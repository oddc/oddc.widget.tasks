(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskFilesDelete', {
            templateUrl: 'src/shared/components/task-files-delete/task-files-delete.component.html',
            controller: taskFilesDeleteController,
            controllerAs: 'ctrl'
        });

    taskFilesDeleteController.$inject = ['$stateParams', 'taskService', 'widgetState', '$sessionStorage'];
    function taskFilesDeleteController($stateParams, taskService, widgetState, $sessionStorage) {
        var self = this;
        self.error = "";
        self.tasklist = null;
        self.$onInit = $onInit;
        self.file = null;


        widgetState.setBackButtonState('tasks.task', { listid: $stateParams.listid, taskid: '' });
        function $onInit() {
            if ($sessionStorage.files !== undefined) {
                for (var i = 0; i < $sessionStorage.files.length; i++) {
                    if ($sessionStorage.files[i].id === $stateParams.fileid) {
                        self.file = $sessionStorage.files[i];
                        break;
                    }
                }
            }
        }


        self.cancel = function () {
            widgetState.go('tasks.filesdetails', { listid: $stateParams.listid, taskid: $stateParams.taskid, fileid: $stateParams.fileid });
        };


        self.delete = function () {
            var task = taskService.getSelectedTask();
            task['documentId'] = $stateParams.fileid;
            task['deleteDoc']  = true;

            taskService.updateTask(task).then(function (result) {
                if (result.error) {
                    self.error = result.message;
                }
                else {
                    widgetState.go('tasks.files', { listid: $stateParams.listid, taskid: $stateParams.taskid });
                }
            });
        };
    }

})();