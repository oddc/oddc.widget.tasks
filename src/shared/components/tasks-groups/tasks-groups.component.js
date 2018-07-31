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

    tasksGroupsController.$inject = ['taskService', 'widgetState', '$sessionStorage', '$timeout'];
    function tasksGroupsController(taskService, widgetState, $sessionStorage, $timeout) {
        var self = this;
        self.tasklists = [];
        self.isLoading = true;


        taskService.readTaskLists().then(function (result) {
            self.tasklists = [];


            for (var i = 0; i < result.length; i++) {
                if (result[i].isPrivate) {
                    result[i]['isLoading'] = false;
                    self.tasklists.push(result[i]);
                }
            }

            for (var i = 0; i < result.length; i++) {
                if (result[i].isTeamlist) {
                    result[i]['isLoading'] = false;
                    self.tasklists.push(result[i]);
                }
            }

            for (var i = 0; i < result.length; i++) {
                if (result[i].isProjectgrouplist) {
                    result[i]['isLoading'] = false;
                    self.tasklists.push(result[i]);
                }
            }

            for (var i = 0; i < result.length; i++) {
                if (result[i].isSearchList) {
                    result[i]['isLoading'] = false;
                    self.tasklists.push(result[i]);
                }
            }

            for (var i = 0; i < result.length; i++) {
                if (!result[i].isPrivate && !result[i].isTeamlist && !result[i].isProjectgrouplist && !result[i].isSearchList) {
                    result[i]['isLoading'] = false;
                    self.tasklists.push(result[i]);
                }
            }

            self.isLoading = false;
            console.log('#### tasklist ####', self.tasklists);
        });


        self.openList = function(list) {
            list.isLoading = true;

            var errorStr = '';
            taskService.readTaskList(list.id).then(function (result) {
                $sessionStorage.tasklist = result;
                if (result.error === undefined) {

                    taskService.setTasks([]);
                    $timeout(function () {
                        taskService.setTasks(result.tasks);
                    });

                    widgetState.go('task.edit', {listid: result.id});
                }
                else {
                    errorStr = error.message;
                }

                list.isLoading = false;
                self.onSelectTasklist({ errorStr: errorStr });
            });


        };
    }

})();