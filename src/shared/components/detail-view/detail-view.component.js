(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('detailView', {
            templateUrl: 'src/shared/components/detail-view/detail-view.component.html',
            controller: detailViewController,
            controllerAs: 'detailViewController',
            bindings: {
                assignedTo: '<'
            }
        });

    detailViewController.$inject = ['$log', '$state', '$stateParams', 'taskService', 'widgetState', '$timeout'];
    function detailViewController($log, $state, $stateParams, taskService, widgetState, $timeout) {
        var vm = this;
        vm.service = taskService;
        vm.desc = null;
        vm.$onInit = $onInit;
        vm.delayedSave = delayedSave;
        vm.openTask = openTask;
        vm.closeTask = closeTask;
        vm.detachUser = detachUser;
        vm.onClickAssign = onClickAssign;

        function $onInit() {
            console.log('state -> ', $stateParams.id);
            if ($stateParams.id === '') {
                $state.go('task');
                return;
            }
            if (vm.service.getColumns < 2) {
                widgetState.setBackButtonState('task');
            }
            //if (vm.service.getSelectedTask() === null) {
                taskService
                    .requestTask($stateParams.id)
                    .catch(function (error) {
                        $log.error(error);
                    });
            //}
        }

        function detachUser(event, task, user) {
            event.stopPropagation();
            var index = task.userIds.indexOf(user.openId);

            if (index > -1) {
                task.userIds.splice(index, 1);
            }

            taskService
                .updateTask(task)
                .then(onUpdateTaskSuccess)
                .catch(onUpdateTaskError);

            function onUpdateTaskSuccess(result) {
                $log.debug('user wurde detached');
                var index = vm.task.users.indexOf(user);
                if (index > -1) {
                    vm.task.users.splice(index, 1);
                }
            }

            function onUpdateTaskError(error) {
                $log.error(error);
            }
        }

        function openTask(task) {
            task.open = true;
            taskService
                .updateTask(task)
                .then(onOpenTaskSuccess)
                .catch(onOpenTaskError);

            function onOpenTaskSuccess(result) {
                $state.go('task');
            }

            function onOpenTaskError(error) {
                $log.error(error);
                alert(error);
            }
        }

        function closeTask(task) {
            task.open = false;
            taskService
                .updateTask(task)
                .then(onCloseTaskSuccess)
                .catch(onCloseTaskError);

            function onCloseTaskSuccess(result) {
                $state.go('task');
            }

            function onCloseTaskError(error) {
                $log.error(error);
                alert(error);
            }
        }

        function delayedSave(task) {
            $timeout.cancel(vm.timer);
            vm.timer = $timeout(function () {
                taskService.updateTask(task);
            }, 1000);
        }

        function onClickAssign(task) {
            if (task.open) {
                $state.go('detail.assign');
            }
        }
    }

})();
