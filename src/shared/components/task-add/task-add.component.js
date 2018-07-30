(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskAdd', {
            templateUrl: 'src/shared/components/task-add/task-add.component.html',
            controller: taskAddController,
            controllerAs: 'ctrl',
        });

    taskAddController.$inject = ['widgetState', 'taskService', '$stateParams', '$state'];
    function taskAddController(widgetState, taskService, $stateParams, $state) {
        var vm = this;
        vm.service = taskService;
        vm.$onInit = $onInit;
        vm.tasklist = {};
        vm.users = [];
        vm.isLoading = false;
        vm.isnew = $stateParams.taskid === '' || $stateParams.taskid === 'new';
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


        widgetState.setBackButtonState('detail.view', { listid: $stateParams.listid });

        function $onInit() {
            vm.service.readTaskList($stateParams.listid).then(function (result) {
                vm.tasklist = result;
            })
            .then(loadUserData)
            .then(loadTaskData)
            .then(function () {
                vm.isLoading = true;
            });


        }


        function loadTaskData() {
            if (!vm.isnew) {
                return vm.service.requestTask($stateParams.taskid).then(function (result) {
                    vm.taskObj = result;
                    vm.users = vm.taskObj.users;
                    return true;
                });
            }
            else {
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

            if (!vm.isnew) {
                vm.taskObj.open = vm.taskObj.state !== 'done';

                vm.service.updateTask(vm.taskObj).then(function (result) {
                    if (!result.error) {
                        vm.error = '';
                        widgetState.go('detail.view', {listid: $stateParams.listid});
                        $state.reload();
                    }
                    else {
                        vm.error = result.message;
                    }
                });
            }
            else {
                vm.service.createTask(vm.taskObj).then(function (result) {
                    console.log('createtask #### ', result);
                    vm.tasklist.tasks.push(vm.taskObj);
                    widgetState.go('detail.view', {listid: $stateParams.listid, taskid: ''});
                });
            }
        };


        vm.cancel = function () {
            widgetState.go('detail.view', {listid: $stateParams.listid, taskid: ''});
        };


        vm.removeUser = function (user) {
            for (var i = 0; i < vm.taskObj.userIds.length; i++) {
                if (vm.taskObj.userIds[i] === user.openId) {
                    vm.taskObj.userIds.splice(i, 1);
                }
            }

            for (var j = 0; j < vm.users.length; j++) {
                if (vm.users[j].openId === user.openId) {
                    vm.users.splice(j, 1);
                }
            }


            vm.service.updateTask(vm.taskObj).then(function (result) {
                if (!result.error) {
                    vm.error = '';
                    window.location.reload();
                }
                else {
                    vm.error = result.message;
                }
            });
        };

        vm.addSubscriber = function () {
            widgetState.go('detail.subscriber', { listid: $stateParams.listid, taskid: $stateParams.taskid });
        };


        vm.deleteTask = function () {
            widgetState.go('detail.delete', { listid: $stateParams.listid, taskid: $stateParams.taskid });
        };


        vm.done = function () {
            vm.taskObj.state = vm.taskObj.state !== 'done' ? 'done' : 'open';
            vm.saveTask();
        };

    }

})();