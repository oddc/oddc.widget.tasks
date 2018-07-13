(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('searchResult', {
            templateUrl: 'src/shared/components/search-result/search-result.component.html',
            controller: searchResultController,
            controllerAs: 'ctrl',
        });

    searchResultController.$inject = ['widgetState', 'taskService', '$stateParams', '$base64', '$timeout', '$scope'];
    function searchResultController(widgetState, taskService, $stateParams, $base64, $timeout, $scope) {
        var vm = this;
        vm.$onInit = $onInit;
        vm.search = '';
        vm.data = [{huhu: 'huhu'}];
        vm.isLoading = false;

        function $onInit() {
            $scope.$watch(function () { return $stateParams; }, function(newValue, oldValue) {
                vm.isLoading = true;
                vm.search = JSON.parse($base64.decode(newValue.search));
                console.log(vm.search);

                /*
                text: '',
                assigned_my: false,
                assigned_to: false,
                assigned_to_user: '',
                overdue: false,
                completed_task: false
                */

                var searchObj = {
                    "searchString": vm.search.text,
                    "inTitle": true,
                    "inDescription": true,
                    "selfAssigned": vm.search.assigned_my,
                    "assignedTo": vm.search.assigned_to_user,
                    "isDone": vm.search.completed_task
                    //"saveSearch": true,
                    //"saveTitle": "string"
                };


                vm.data = [];

                taskService.readTaskLists().then(function (lists) {
                   for (var i = 0; i < lists.length; i++) {
                       if(vm.data[lists[i].id] === undefined) {
                           vm.data[lists[i].id] = {
                               title: lists[i].title,
                               tasks: []
                           };
                       }
                   }

                   taskService.searchTasklist(searchObj).then(function (tasks) {
                       for (var i = 0; i < tasks.length; i++) {
                           if (vm.data[tasks[i].taskListId] !== undefined) {
                               vm.data[tasks[i].taskListId].tasks.push(tasks[i]);
                           }
                       }

                       console.log(vm.data);
                       vm.isLoading = false;
                   });
                });



            }, true);

            //vm.search = JSON.parse($base64.decode($stateParams.search));

        }


        vm.taskClose = function (tasks, task) {
            console.log(tasks, task);
            if (task.checked) {
                $timeout(function () {

                    /*
                     * Warten auf Backend
                     *
                    taskService.updateTask(task).then(function (result) {
                        for (var i = 0; i < tasks.length; i++) {
                            if (tasks[i].id === task.id) {
                                tasks.splice(i, 1);
                                return true;
                            }
                        }
                    });
                    */


                    for (var i = 0; i < tasks.length; i++) {
                        if (tasks[i].id === task.id) {
                            tasks.splice(i, 1);
                            return true;
                        }
                    }
                }, 300);
            }
            return false;
        };


        vm.noResults = function () {
            if (vm.data.length === 0) return true;

            for (var i = 0; i < vm.data.length; i++) {
                console.log('OOOOOOOOOOOO>>>>', vm.data[i].tasks);
                if (vm.data[i].tasks.length > 0) {
                    return false;
                }
            }

            return true;
        };

    }

})();