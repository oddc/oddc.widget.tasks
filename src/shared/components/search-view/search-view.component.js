(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('searchView', {
            templateUrl: 'src/shared/components/search-view/search-view.component.html',
            controller: searchViewController,
            controllerAs: 'ctrl',
            bindings: {
                assignedTo: '<'
            }
        });

    searchViewController.$inject = ['taskService', 'widgetState'];
    function searchViewController(taskService, widgetState) {
        var vm = this;
        vm.$onInit = $onInit;
        vm.users = [];
        vm.data = {
            assigned_my: false,
            assigned_to: false,
            assigned_to_user: '',
            overdue: false,
            completed_task: false
        };


        function $onInit() {
            taskService.readTasklistContacts().then(function (result) {
                vm.users = result;
            });
        }


        vm.search = function () {
            console.log('### search >>>', vm.data);
        };

    }

})();
