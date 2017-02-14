(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('detailAssign', {
            templateUrl: 'src/shared/components/detail-assign/detail-assign.component.html',
            controller: detailAssignController,
            controllerAs: 'detailAssignController'
        });

    detailAssignController.$inject = ['$log', '$state', '$stateParams', 'taskService', 'widgetState'];
    function detailAssignController($log, $state, $stateParams, taskService, widgetState) {
        var vm = this;
        vm.service = taskService;
        vm.taskId = $stateParams.id;
        vm.users = null;
        vm.loading = true;
        vm.attachUser = attachUser;
        vm.$onInit = $onInit;

        function $onInit() {
            if (vm.service.getColumns < 2) {
                widgetState.setBackButtonState('detail.view', { id: vm.taskId });
            }
            vm.service
                .requestUsers()
                .catch(onReadUsersError)
                .finally(onReadTaskDone);

            function onReadUsersError(error) {
                $log.error(error);
                $state.go('detail.view', { id: vm.taskId });
            }

            function onReadTaskDone() {
                vm.loading = false;
            }
        }

        function attachUser(task, user) {
            task.userIds = [user.openId];
            task.users = [user];
            task.users[0].firstName = user.firstname;
            task.users[0].lastName = user.lastname;

            vm.service
                .updateTask(task)
                .then(onUpdateTaskSuccess)
                .catch(onError);

            function onUpdateTaskSuccess(result) {
                vm.service.setSelectedTask(task);
                $state.go('detail.view', { id: vm.taskId });
            }

            function onError(error) {
                $log.error(error);
            }
        }
    }

})();