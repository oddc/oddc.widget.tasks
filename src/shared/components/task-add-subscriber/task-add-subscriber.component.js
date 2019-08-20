(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskAddSubscriber', {
            templateUrl: 'src/shared/components/task-add-subscriber/task-add-subscriber.component.html',
            controller: taskAddSubscriberController,
            controllerAs: 'ctrl'
        });

    taskAddSubscriberController.$inject = ['$stateParams', 'taskService', 'widgetState', '$sessionStorage'];
    function taskAddSubscriberController($stateParams, taskService, widgetState, $sessionStorage) {
        var vm = this;
        vm.$onInit = $onInit;
        vm.users = [];
        vm.tasklist = $sessionStorage.tasklist;
        vm.currentUsers = $sessionStorage.task.userIds;
        vm.task = $sessionStorage.task;
        vm.error = '';

        function $onInit() {
            loadUserList();
        }


        function clearList() {
            var tmp = angular.copy(vm.task.userIds);
            vm.task.userIds = [];

            angular.forEach(tmp, function(obj) {
                if (obj !== null) {
                    vm.task.userIds.push(obj);
                }
            });
        }


        vm.addUser = function (user) {
            clearList();

            if (vm.task.userIds.indexOf(user.id) === -1) {
                vm.task.userIds.push(user.id);
            }

            taskService.updateTask(vm.task).then(function (result) {
                if (result.error) {
                    vm.error = result.message;
                    return;
                }
                widgetState.go('detail.edit', { listid: $stateParams.listid, taskid: $stateParams.taskid });
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