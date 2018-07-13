(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('oddcTasksGroups', {
            templateUrl: 'src/shared/components/tasks-groups/tasks-groups.component.html',
            controller: tasksGroupsController,
            controllerAs: 'ctrl',
            bindings: {
                onSelectTasklist: '&'
            }
        });

    tasksGroupsController.$inject = ['taskService', 'widgetState'];
    function tasksGroupsController(taskService, widgetState) {
        var self = this;

        self.tasklists = [];
        taskService.readTaskLists().then(function (result) {
            self.tasklists = [];

            for (var i = 0; i < result.length; i++) {
                if (result[i].isPrivate) {
                    self.tasklists.push(result[i]);
                }
            }

            for (var i = 0; i < result.length; i++) {
                if (result[i].isTeamlist) {
                    self.tasklists.push(result[i]);
                }
            }

            for (var i = 0; i < result.length; i++) {
                if (result[i].isProjectgrouplist) {
                    self.tasklists.push(result[i]);
                }
            }

            for (var i = 0; i < result.length; i++) {
                if (!result[i].isPrivate && !result[i].isTeamlist && !result[i].isProjectgrouplist) {
                    self.tasklists.push(result[i]);
                }
            }

        });


        self.openList = function(groupid) {
            self.onSelectTasklist({ id: groupid });
        };
    }

})();