(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskView', {
            templateUrl: 'src/shared/components/task-view/task-view.component.html',
            controller: taskViewController,
            controllerAs: 'ctrl',
        });

    taskViewController.$inject = ['widgetState'];
    function taskViewController(widgetState) {
        var vm = this;

        widgetState.setBackButtonState('task', {listid: ''});
    }



})();