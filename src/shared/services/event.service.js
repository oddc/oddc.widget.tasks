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
                "http://localhost:3000", //Only Development
                "http://localhost:4200", //Only Development
                "http://odcweb1.optadata.com",
                "https://portal.test.optadata-one.de",
                "https://portal.optadata-one.de"
            ];

            if(whitelist.indexOf(e.origin) < 0) {
                console.log("Error: Unauthorized Domain '" + e.origin + "'");
                return false;
            }

            var data = e.data;

            if(data.widget === "oddc.widget.tasks") {
                if(data.type === "task.new") taskNew(data.taskid);
                else if(data.type === "task.delete") taskDelete(data.taskid);
                else if(data.type === "task.change") taskChange(data.taskid);
                else if(data.type === "task.solved") taskSolved(data.taskid);
                else if(data.type === "task.reopen") taskReopen(data.taskid);
                else if(data.type === "task.newnote") taskNewnote(data.taskid);
                else {
                    console.log("Warning: Not implemented action!");
                    return false;
                }
            }

            return true;
        }


        /**
         * Event taskNew
         * @param taskid
         */
        function taskNew(taskid) {
            taskService.addTaskById(taskid).then(function(result) {
                taskService.setSelectedTask(result);
            });
        }


        /**
         * Event taskDelete
         * @param taskid
         */
        function taskDelete(taskid) {
            taskService.removeTask(taskid);
            taskService.selectFirstTask();
            $state.go('task');
        }


        /**
         * Event taskChange
         * @param taskid
         */
        function taskChange(taskid) {
            console.log('task.change -> not implemented');
        }


        /**
         * Event taskSolved
         * @param taskid
         */
        function taskSolved(taskid) {
            taskService.openCloseTask(taskid, false).then(function() {
                taskService.selectFirstTask();
            });
        }


        /**
         * Event taskReopen
         * @param taskid
         */
        function taskReopen(taskid) {
            taskService.openCloseTask(taskid, true).then(function(result) {
                taskService.setSelectedTask(result);
            });
        }


        /**
         * Event taskNewnote
         * @param taskid
         */
        function taskNewnote(taskid) {
            taskService.updateDescription(taskid).then(function(result) {
                taskService.setSelectedTask(result);
            });
        }


        return _service;
    }

})();
