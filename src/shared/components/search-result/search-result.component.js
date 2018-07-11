(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('searchResult', {
            templateUrl: 'src/shared/components/search-result/search-result.component.html',
            controller: searchResultController,
            controllerAs: 'ctrl',
        });

    searchResultController.$inject = ['widgetState', 'taskService', '$stateParams', '$base64', '$timeout'];
    function searchResultController(widgetState, taskService, $stateParams, $base64, $timeout) {
        var vm = this;
        vm.$onInit = $onInit;
        vm.search = '';
        vm.data = [];

        function $onInit() {
            vm.search = JSON.parse($base64.decode($stateParams.search));

            //DEMO-DATEN
            vm.data = [
                {
                    title: 'Team Liste',
                    tasks: [
                        { title: 'Aufgabe 1', id: 'asdasdasdasd1', checked: false },
                        { title: 'Aufgabe 2', id: 'asdasdasdasd2', checked: false },
                        { title: 'Aufgabe 3', id: 'asdasdasdasd3', checked: false }
                    ]
                },
                {
                    title: 'Private Liste',
                    tasks: [
                        { title: 'Aufgabe 4', id: 'asdasdasdasd4', checked: false },
                        { title: 'Aufgabe 5', id: 'asdasdasdasd5', checked: false },
                        { title: 'Aufgabe 6', id: 'asdasdasdasd6', checked: false }
                    ]
                },
                {
                    title: 'Cave Diver',
                    tasks: [
                        { title: 'Aufgabe 7', id: 'asdasdasdasd7', checked: false },
                        { title: 'Aufgabe 8', id: 'asdasdasdasd8', checked: false },
                        { title: 'Aufgabe 9', id: 'asdasdasdasd9', checked: false }
                    ]
                }
            ];

            console.log(vm.search);
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
                if (vm.data[i].tasks.length > 0) {
                    return false;
                }
            }

            return true;
        };

    }

})();