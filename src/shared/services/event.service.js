(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .factory('eventService', eventFactory);

    eventFactory.$inject = ['$state', 'taskService'];
    function eventFactory($state, taskService) {
        var _service = {
            addEventListener: addEventListener,
        };


        /**
         * Add the EventListener
         */
        function addEventListener() {
            if(window.addEventListener) {
                window.addEventListener("message", parentEvent, false);
            }
            else {
                window.attachEvent("onmessage", parentEvent);
            }
        }


        /**
         * EventListener Function
         * @param e Event
         * @returns {boolean}
         */
        function parentEvent(e) {
            var whitelist = [
                "http://localhost", //Only Development
                "http://odcweb1.optadata.com",
                "https://portal.test.optadata-one.de",
                "https://portal.optadata-one.de"
            ];

            if(whitelist.indexOf(e.origin) < 0) {
                console.log("Error: Unauthorized Domain '" + e.origin + "'");
                return false;
            }

            if(e.data.id === "oddc.widget.tasks") {
                if(e.data.action === "newtask") newTask(e.data.data);
                else if(e.data.action === "rmtask") rmTask(e.data.data);
                else {
                    console.log("Warning: Not implemented action!");
                    return false;
                }
            }

            return true;
        }


        /**
         * Event newTask
         * @param data
         */
        function newTask(data) {
            taskService.addTask(data);
            $state.go('.');
        }


        /**
         * Event rmTask
         * @param data
         */
        function rmTask(data) {
            taskService.removeTask(data.id);
            $state.go('.');
        }


        return _service;
    }

})();
