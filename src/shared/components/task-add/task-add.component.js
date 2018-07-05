(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskAdd', {
            templateUrl: 'src/shared/components/task-add/task-add.component.html',
            controller: taskAddController,
            controllerAs: 'ctrl',
        });

    taskAddController.$inject = ['widgetState', 'taskService', '$stateParams'];
    function taskAddController(widgetState, taskService, $stateParams) {
        var vm = this;
        vm.service = taskService;
        vm.$onInit = $onInit;
        vm.tasklist = {};
        vm.users = [];
        vm.isLoading = true;
        vm.isnew = $stateParams.taskid === '';
        vm.error = "";

        vm.popup = {
            opened: false
        };

        vm.options = {
            minDate: new Date(),
            showWeeks: true
        };

        vm.taskObj = {
            users: [],
            userIds: [],
            description: "",
            id: "",
            title: "",
            userId: "",
            open: true,
            projectGroupId: 0,
            taskListId: $stateParams.listid,
            dueDate: new Date(),
            state: "open",
            important: false
        };


        function $onInit() {
            vm.service.readTaskList($stateParams.listid).then(function (result) {
                vm.tasklist = result;
            })
            .then(loadUserData)
            .then(loadTaskData)
            .then(function () {
                console.log('tasklist', vm.tasklist);
                console.log('users', vm.users);
                console.log('taskObj', vm.taskObj);
                vm.isLoading = false;
            });


        }


        function loadTaskData() {
            if (!vm.isnew) {
                console.log('load task');
                return vm.service.requestTask($stateParams.taskid).then(function (result) {
                    vm.taskObj = result;
                    vm.users = vm.taskObj.users;
                    return true;
                });
            }
            else {
                console.log('new task');
                var user = vm.service.getCurrentUser();
                vm.taskObj.userId = user.id;
                vm.taskObj.users.push({ userId: user.id, openId: user.openId});
                vm.taskObj.userIds.push(user.openId);
                vm.users.push(user);
                return true;
            }
            return false;
        }


        function loadUserData() {
            if (vm.service.getCurrentUser() === null) {
                return vm.service.requestCurrentUser();
            }
            return true;
        }


        vm.openDatepicker = function() {
            vm.popup.opened = true;
        };


        vm.saveTask = function () {
            if (!angular.isNumber(vm.taskObj.dueDate)) {
                vm.taskObj.dueDate = Date.parse(vm.taskObj.dueDate);
            }

            console.log('save task');
            if (!vm.isnew) {
                vm.service.updateTask(vm.taskObj).then(function (result) {
                    if (!result.error) {
                        vm.error = '';
                        widgetState.go('tasks', {id: $stateParams.listid});
                    }
                    else {
                        vm.error = result.message;
                    }
                });
            }
            else {
                console.log('task', vm.taskObj);
                vm.service.createTask(vm.taskObj).then(function () {
                    vm.tasklist.tasks.push(vm.taskObj);
                    console.log('save');
                });
            }
        };


        vm.cancel = function () {
            console.log('cancel task');
        };





        function loadUserList() {
            vm.users = [];

            if (vm.tasklist.privateList) {
                return true;
            }
            else if (vm.tasklist.projectGroupList) {
                return vm.service.readProjektGroupUsers(vm.tasklist.projectGroupId).then(function (result) {
                    for (var i = 0; i < result.length; i++) {
                        vm.users.push(result[i].user);
                    }
                    return true;
                });
            }
            else if(vm.tasklist.teamList) {
                return vm.service.requestUsers().then(function (result) {
                    vm.users = result;
                    return true;
                });
            }
            else {
                return vm.service.readTasklistContacts().then(function (result) {
                    vm.users = result;
                    return true;
                });
            }

            return false;
        }

    }

})();