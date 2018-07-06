(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('tasklistAdd', {
            templateUrl: 'src/shared/components/tasklist-add/tasklist-add.component.html',
            controller: tasklistAddController,
            controllerAs: 'ctrl'
        });

    tasklistAddController.$inject = ['taskService', 'widgetState'];
    function tasklistAddController(taskService, widgetState) {
        var self = this;
        self.name = '';
        self.error = '';


        self.save = function () {
            self.error = '';

            if (self.name === '') {
                self.error = 'Sie müssen einen Namen für die Taskliste angeben!';
                return;
            }

            taskService.createTaskList({ title: self.name }).then(function () {
                widgetState.go('tasklist');
            }, function () {
                self.error = "Es ist ein Fehler beim speichern aufgetreten!";
            });
        };


        self.cancel = function () {
            widgetState.go('tasklist');
        };

    }

})();