(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('searchResult', {
            templateUrl: 'src/shared/components/search-result/search-result.component.html',
            controller: searchResultController,
            controllerAs: 'ctrl',
        });

    searchResultController.$inject = ['taskService', '$stateParams', '$base64', '$timeout', '$scope'];
    function searchResultController(taskService, $stateParams, $base64, $timeout, $scope) {
        var vm = this;
        vm.$onInit = $onInit;
        vm.search = '';
        vm.data = [];
        vm.isLoading = false;

        function $onInit() {
            $scope.$watch(function () { return $stateParams; }, function(newValue, oldValue) {
                vm.isLoading = true;
                if (newValue.search === '' || newValue.search === undefined) {
                    vm.isLoading = false;
                    return;
                }

                vm.search = JSON.parse($base64.decode(newValue.search));

                var searchObj = {
                    "searchString": vm.search.text,
                    "inTitle": true,
                    "inDescription": true,
                    "selfAssigned": vm.search.assigned_my,
                    "assignedTo":  vm.search.assigned_to ? vm.search.assigned_to_user : '',
                    "isOverdue": vm.search.overdue,
                    "isDone": vm.search.completed_task,
                    "saveSearch": vm.search.save_search,
                    "saveTitle": vm.search.save_search ? vm.search.save_search_to : ''
                };

                console.log(searchObj);


                vm.data = [];
                taskService.readTaskLists().then(function (lists) {
                   for (var i = 0; i < lists.length; i++) {
                       if(getListItem(lists[i].id) === null) {
                           vm.data.push({
                               listid: lists[i].id,
                               title: lists[i].title,
                               tasks: []
                           });
                       }
                   }

                   taskService.searchTasklist(searchObj).then(function (tasks) {
                       for (var i = 0; i < tasks.length; i++) {
                           var item = getListItem(tasks[i].taskListId);
                           if (item !== null) {
                               item.tasks.push(tasks[i]);
                           }
                       }
                       vm.isLoading = false;
                   });
                });
            }, true);

        }


        function getListItem(listid) {
            for (var i = 0; i < vm.data.length; i++) {
                if (vm.data[i].listid === listid) {
                    return vm.data[i];
                }
            }
            return null;
        }


        vm.taskClose = function (tasks, task) {
            if (task.checked) {
                $timeout(function () {

                    task.open  = false;
                    task.state = 'done';

                    taskService.updateTask(task).then(function (result) {
                        if (!result.error) {
                            for (var i = 0; i < tasks.length; i++) {
                                if (tasks[i].id === task.id) {
                                    tasks.splice(i, 1);
                                    return true;
                                }
                            }
                        }
                    });

                }, 300);
            }
            return false;
        };


        vm.noResults = function () {
            if (vm.data.length === 0) return true;

            for (var i = 0; i < vm.data.length; i++) {
                if (vm.data[i].tasks.length > 0) {
                    return false;
                }
            }

            return true;
        };

    }

})();