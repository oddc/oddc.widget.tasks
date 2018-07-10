(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskAddSubscriber', {
            templateUrl: 'src/shared/components/task-add-subscriber/task-add-subscriber.component.html',
            controller: taskAddSubscriberController,
            controllerAs: 'ctrl'
        });

    taskAddSubscriberController.$inject = ['$stateParams', 'taskService', 'widgetState'];
    function taskAddSubscriberController($stateParams, taskService, widgetState) {
        var vm = this;
        vm.$onInit = $onInit;
        vm.users = [];
        vm.tasklist = {};
        vm.currentUsers = [];
        vm.task = {};
        vm.error = '';

        function $onInit() {
            taskService.readTaskList($stateParams.listid).then(function (tasklist) {
               vm.tasklist = tasklist;
               loadUserList();

               for (var i = 0; i < vm.tasklist.tasks.length; i++) {
                   if (vm.tasklist.tasks[i].id === $stateParams.taskid) {
                       vm.currentUsers = vm.tasklist.tasks[i].userIds;
                       vm.task = vm.tasklist.tasks[i];
                       break;
                   }
               }
            });
        }


        vm.addUser = function (user) {
            vm.task.userIds.push(user.openid);

            taskService.updateTask(vm.task).then(function (result) {
                if (result.error) {
                    vm.error = result.message;
                    return;
                }
                widgetState.go('taskedit.view', { listid: $stateParams.listid, taskid: $stateParams.taskid });
            });
        };


        function loadUserList() {
            vm.users = [];

            if (vm.tasklist.privateList) {
                return true;
            }
            else if (vm.tasklist.projectGroupList) {
                return taskService.readProjektGroupUsers(vm.tasklist.projectGroupId).then(function (result) {
                    for (var i = 0; i < result.length; i++) {
                        vm.users.push(result[i].user);
                    }
                    return true;
                });
            }
            else if(vm.tasklist.teamList) {
                return taskService.requestUsers().then(function (result) {
                    vm.users = result;
                    return true;
                });
            }
            else {
                return taskService.readTasklistContacts().then(function (result) {
                    vm.users = result;
                    return true;
                });
            }

            return false;
        }
    }

})();