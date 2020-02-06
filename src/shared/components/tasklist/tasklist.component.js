(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('tasklist', {
            templateUrl: 'src/shared/components/tasklist/tasklist.component.html',
            controller: tasklistController,
            controllerAs: 'ctrl',
            bindings: {
            }
        });

    tasklistController.$inject = ['taskService', 'widgetState', '$sessionStorage', '$timeout'];
    function tasklistController(taskService, widgetState, $sessionStorage, $timeout) {
        var self = this;
        self.tasklists = [];
        self.isLoading = true;

        taskService.readTaskLists().then(function (result) {
            self.tasklists = [];
            console.log('## load ##', result);

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
        });


        self.openList = function(list) {
            list.isLoading = true;

            $sessionStorage.tasklist = null;
            widgetState.go('tasks.list', {listid: list.id, taskid: ''});

            /*
            taskService.readTaskList(list.id).then(function (result) {
                $sessionStorage.tasklist = result;
                if (result.error === undefined) {

                    taskService.setTasks(result.tasks);
                    console.log('###', list.id, result);


                }
                list.isLoading = false;
            });
            */
        };
    }

})();