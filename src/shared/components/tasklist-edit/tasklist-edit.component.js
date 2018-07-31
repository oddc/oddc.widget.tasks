(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('tasklistEdit', {
            templateUrl: 'src/shared/components/tasklist-edit/tasklist-edit.component.html',
            controller: tasklistEditController,
            controllerAs: 'ctrl'
        });

    tasklistEditController.$inject = ['taskService', 'widgetState', '$stateParams', '$sessionStorage'];
    function tasklistEditController(taskService, widgetState, $stateParams, $sessionStorage) {
        var self = this;
        self.tasklist = null;
        self.error = '';

        if($stateParams.listid === '') {
            self.error = 'Bitte wählen Sie eine Liste aus!';
        }
        else {
            self.tasklist = $sessionStorage.tasklist;
        }


        self.delete = function () {
            widgetState.go('task.delete', { listid: $stateParams.listid });
        };


        self.save = function () {

        };


        self.open = function () {
            widgetState.go('detail.view', { listid: $stateParams.listid, taskid: '' });
        };


        self.canEdit = function () {
            if (self.tasklist === null) return false;
            return (!self.tasklist.privateList && !self.tasklist.projectGroupList && !self.tasklist.teamList);
        };
    }

})();