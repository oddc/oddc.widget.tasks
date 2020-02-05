(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('task', {
            templateUrl: 'src/shared/components/task/task.component.html',
            controller: taskController,
            controllerAs: 'ctrl',
        });

    taskController.$inject = ['widgetState', 'taskService', '$stateParams', '$sessionStorage', '$q', '$timeout', 'Notification'];
    function taskController(widgetState, taskService, $stateParams, $sessionStorage, $q, $timeout, Notification) {
        var vm = this;
        vm.service = taskService;
        vm.$onInit = $onInit;
        vm.tasklist = $sessionStorage.tasklist;
        vm.users = [];
        vm.isLoading = true;
        vm.isnew = $stateParams.taskid === 'new';
        vm.isempty = $stateParams.taskid === '';
        vm.error = "";

        vm.popup = {
            opened: false
        };

        vm.options = {
            minDate: new Date(),
            showWeeks: true
        };

        vm.taskObj = {
            //users: [],
            userIds: [],
            description: "",
            id: "",
            title: "",
            userId: "",
            open: true,
            disabled: false,
            projectGroupId: 0,
            taskListId: $stateParams.listid,
            dueDate: new Date(),
            state: "open",
            important: false
        };


        widgetState.setBackButtonState('tasklist.view', { listid: '' });

        function $onInit() {
            if (vm.isempty) {
                return;
            }

            loadUserData()
            .then(loadTaskData)
            .then(loadSubData)
            .then(function () {
                $timeout(function () {
                    console.log('TASK', vm.taskObj);
                    console.log('USERS', vm.users);
                    vm.isLoading = false;
                }, 500);
            });
        }


        function loadSubData() {
            angular.forEach(vm.taskObj.userIds, function (obj) {
                vm.service.readUser(obj).then(function (user) {
                    vm.users.push(user);
                });
            });
        }


        function loadTaskData() {
            if (!vm.isnew) {
                return vm.service.requestTask($stateParams.taskid).then(function (result) {
                    if (result.error) {
                        vm.error = result.message;
                    }

                    vm.taskObj = result;
                    /*
                    if (!vm.isnew) {
                        vm.taskObj['userIds'] = vm.taskObj.writingUserIds;
                    }
                    */

                    $sessionStorage.task = vm.taskObj;
                    return true;
                });
            }
            else {
                var user = vm.service.getCurrentUser();
                vm.taskObj.userId = user.openId;
                //vm.taskObj.users.push({ userId: user.userId, openId: user.openId});
                vm.taskObj.userIds.push(user.userId);

                return $q.resolve(true);
            }
            return $q.resolve(false);
        }


        function loadUserData() {
            if (vm.service.getCurrentUser() === null) {
                return vm.service.requestCurrentUser();
            }

            return $q.resolve(true);
        }


        function changeValues() {
            for (var i = 0; i < vm.tasklist.tasks.length; i++) {
                if (vm.tasklist.tasks[i].id === vm.taskObj.id) {
                    vm.tasklist.tasks[i].title = vm.taskObj.title;
                    vm.tasklist.tasks[i].open = vm.taskObj.open;
                    vm.tasklist.tasks[i].state = vm.taskObj.state;
                    break;
                }
            }
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
                        $sessionStorage.task = vm.taskObj;
                        changeValues();
                        Notification.primary('Änderungen wurden gespeichert!');
                        widgetState.go('tasks.task', {listid: $stateParams.listid, taskid: ''});
                    }
                    else {
                        vm.error = result.message;
                    }
                });
            }
            else {
                vm.service.createTask(vm.taskObj).then(function (result) {
                    vm.taskObj = result;
                    widgetState.go('tasks.task', {listid: $stateParams.listid, taskid: result.id});
                });
            }
        };


        vm.cancel = function () {
            widgetState.go('tasks', {listid: $stateParams.listid });
        };


        vm.removeUser = function (user) {
            for (var i = 0; i < vm.taskObj.userIds.length; i++) {
                if (vm.taskObj.userIds[i] === user.userId) {
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
            widgetState.go('tasks.subscriber', { listid: $stateParams.listid, taskid: $stateParams.taskid });
        };


        vm.deleteTask = function () {
            widgetState.go('tasks.delete', { listid: $stateParams.listid, taskid: $stateParams.taskid });
        };


        vm.done = function () {
            vm.taskObj.state = vm.taskObj.state !== 'done' ? 'done' : 'open';
            vm.saveTask();
        };


        vm.canRemove = function () {
            //return vm.users.length > 1;

            return true;  //Admin User wird nicht angezeigt
        };

    }

})();