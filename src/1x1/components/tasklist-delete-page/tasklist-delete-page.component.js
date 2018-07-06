(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('tasklistDeletePage', {
            templateUrl: 'src/1x1/components/tasklist-delete-page/tasklist-delete-page.component.html',
            controller: tasklistDeletePageController,
            controllerAs: 'ctrl'
        });

    tasklistDeletePageController.$inject = [];
    function tasklistDeletePageController() {
        var vm = this;
    }

})();
