(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .factory('taskService', taskFactory);

    taskFactory.$inject = ['widgetServices', '$q', '$log', '$filter'];
    function taskFactory(widgetServices, $q, $log, $filter) {
        var _tasks = [],
            _selectedTask = null,
            _currentUser = null,
            _closedTasksVisibility = false,
            _users = [],
            _columns = 1,
            _service = {
                createTask: createTask,
                requestTask: requestTask,
                requestTasks: requestTasks,
                updateTask: updateTask,
                deleteTask: deleteTask,
                setTasks: setTasks,
                getTasks: getTasks,
                completeTask: completeTask,
                addTask: addTask,
                removeTask: removeTask,
                createComment: createComment,
                updateComment: updateComment,
                deleteComment: deleteComment,
                addComment: addComment,
                requestUsers: requestUsers,
                getUsers: getUsers,
                readUser: readUser,
                requestCurrentUser: requestCurrentUser,
                getCurrentUser: getCurrentUser,
                setCurrentUser: setCurrentUser,
                isClosedTasksVisible: isClosedTasksVisible,
                setClosedTasksVisibility: setClosedTasksVisibility,
                getSelectedTask: getSelectedTask,
                setSelectedTask: setSelectedTask,
                selectFirstTask: selectFirstTask,
                deleteSelectedTask: deleteSelectedTask,
                setColumns: setColumns,
                getColumns: getColumns,
                addTaskById: addTaskById,
                updateDescription: updateDescription,
                openCloseTask: openCloseTask,
                readTaskLists: readTaskLists,
                readTaskList: readTaskList,
                searchTasks: searchTasks,
                updateTaskList: updateTaskList,
                createTaskList: createTaskList,
                deleteTaskList: deleteTaskList,
                readProjektGroupUsers: readProjektGroupUsers,
                readTasklistContacts: readTasklistContacts,
                searchTasklist: searchTasklist,
                readDocuments: readDocuments
            };




        function requestTask(taskId) {
            return widgetServices
                .callService('readTask', {id: taskId})
                .then(function (response) {
                    return _selectedTask = response;
                })
                .catch(errorCallback);
        }

        function requestTasks() {
            if (_tasks.length > 0) {
                return $q.resolve(_tasks);
            }
            return widgetServices
                .callService('readTasks')
                .then(function (response) {
                    _tasks = response;
                    return _tasks;
                })
                .catch(errorCallback);
        }

        function createTask(task) {
            return widgetServices
                .callService('createTask', task)
                .then(function (result) {
                    result.comments = [];
                    result.modifiedAt = Date.now();
                    _tasks.push(result);
                    _service.setSelectedTask(result);
                })
                .catch(errorCallback);
        }

        function updateTask(task) {
            return widgetServices
                .callService('updateTask', task)
                .then(getResponse)
                .catch(errorCallback);
        }

        function deleteTask(taskId) {
            console.log('### DELETE TASK >>>', taskId);

            return widgetServices
                .callService('deleteTask', {id: taskId})
                .then(onDeleteTaskSuccess)
                .catch(errorCallback);

            function onDeleteTaskSuccess(response) {
                console.log('### DELETE TASK - DONE >>>', response);
                if (!response.error) {
                    _tasks.forEach(function (task, index, tasks) {
                        if (task.id === taskId) {
                            tasks.splice(index, 1);
                            return;
                        }
                    });
                }
            }
        }

        function setTasks(tasks) {
            _tasks.length = 0;
            _tasks = tasks;
        }

        function getTasks() {
            return _tasks;
        }

        function completeTask(taskId) {
            return widgetServices
                .callService('completeTask', {id: taskId})
                .then(getResponse)
                .catch(errorCallback);
        }

        function addTask(task) {
            _tasks.push(task);
        }

        function createComment(taskId, text) {
            return widgetServices
                .callService('createComment', {taskId: taskId, comment: text})
                .then(function (comment) {
                    _service.addComment(comment);
                })
                .catch(errorCallback);
        }

        function updateComment(comment) {
            return widgetServices
                .callService('updateComment', comment)
                .then(getResponse)
                .catch(errorCallback);
        }

        function deleteComment() {
            return widgetServices
                .callService('deleteComment')
                .then(getResponse)
                .catch(errorCallback);
        }

        function addComment(comment) {
            _selectedTask.comments.push(comment);
        }

        function requestUsers() {
            return widgetServices
                .callService('readUsers')
                .then(function (users) {
                    _users = users;
                    return _users;
                })
                .catch(errorCallback);
        }

        function getUsers() {
            return _users;
        }

        function readUser(userId) {
            return widgetServices
                .callService('readUser', {id: userId})
                .then(getResponse)
                .catch(errorCallback);
        }

        function requestCurrentUser() {
            return widgetServices
                .callService('getCurrentUser')
                .then(function (data) {
                    _service.setCurrentUser(data);
                    return _currentUser;
                })
                .catch(errorCallback);
        }

        function getCurrentUser() {
            return _currentUser;
        }

        function setCurrentUser(user) {
            _currentUser = user;
        }

        function isClosedTasksVisible() {
            return _closedTasksVisibility;
        }

        function setClosedTasksVisibility(visibility) {
            _closedTasksVisibility = visibility;
        }

        function getSelectedTask() {
            return _selectedTask;
        }

        function setSelectedTask(task) {
            _selectedTask = task;
        }

        function selectFirstTask() {
            var openTasks = _service.getTasks().filter(function (task) {
                if (task.open) {
                    return task;
                }
            });
            if(openTasks.length) {
                var firstOpenTask = $filter('orderBy')(openTasks, '-lastActivity')[0];
                _service.setSelectedTask(firstOpenTask);
            }
        }

        function deleteSelectedTask() {
            return _service.deleteTask(_selectedTask.id);
        }

        function setColumns(columns) {
            _columns = columns;
        }

        function getColumns() {
            return _columns;
        }

        function getResponse(response) {
            return response;
        }

        function errorCallback(error) {
            $log.error(error);
            return $q.reject(error);
        }


        function readProjektGroupUsers(groupid) {
            return widgetServices
                .callService('readProjektGroupUsers', {id: groupid})
                .then(getResponse)
                .catch(errorCallback)
        }


        function readTaskLists() {
            return widgetServices
                .callService('readTaskLists')
                .then(getResponse)
                .catch(errorCallback);
        }


        function readTaskList(id) {
            return widgetServices
                .callService('readTaskList', {id: id})
                .then(getResponse)
                .catch(errorCallback);
        }


        function searchTasks(searchObj) {
            return widgetServices
                .callService('searchTasks', searchObj)
                .then(getResponse)
                .catch(errorCallback);
        }


        function updateTaskList(obj) {
            return widgetServices
                .callService('updateTaskList', obj)
                .then(getResponse)
                .catch(errorCallback);
        }


        function createTaskList(obj) {
            return widgetServices
                .callService('createTaskList', obj)
                .then(getResponse)
                .catch(errorCallback);
        }


        function deleteTaskList(id) {
            return widgetServices
                .callService('deleteTaskList', {id: id})
                .then(getResponse)
                .catch(errorCallback);
        }


        function readTasklistContacts() {
            return widgetServices
                .callService('readTasklistContacts')
                .then(getResponse)
                .catch(errorCallback);
        }


        function searchTasklist(search) {
            return widgetServices
                .callService('searchTasklist', search)
                .then(getResponse)
                .catch(errorCallback);
        }


        function readDocuments(taskId) {
            return widgetServices
                .callService('readDocuments', {id: taskId})
                .then(getResponse)
                .catch(errorCallback);
        }


        //==========================================================
        // Fuer den SocketEventListener
        //==========================================================


        function addTaskById(taskId) {
            return widgetServices
                .callService('readTask', {id: taskId})
                .then(function (response) {
                    addTask(response);
                    return response;
                })
                .catch(errorCallback);
        }


        function updateDescription(taskId) {
            return widgetServices
                .callService('readTask', {id: taskId})
                .then(function (response) {
                    for(var i = 0; i < _tasks.length; i++) {
                        if(_tasks[i].id === taskId) {
                            _tasks[i].description = response.description;
                            if(_tasks[i].comments.length !== response.comments.length) {
                                _tasks[i].comments = response.comments;
                            }
                            break;
                        }
                    }
                    return response;
                })
                .catch(errorCallback);
        }


        function openCloseTask(taskId, open) {
            var task = null;

            for(var i = 0; i < _tasks.length; i++) {
                if(_tasks[i].id === taskId) {
                   task = _tasks[i];
                   break;
                }
            }

            if(task === null) return $q.reject(false);

            task.open = open;
            return updateTask(task).then(function () {
                return task;
            });
        }


        function removeTask(taskId) {
            for(var i = 0; i < _tasks.length; i++) {
                if(_tasks[i].id === taskId) {
                    _tasks.splice(i, 1);
                    break;
                }
            }
        }



        return _service;
    }

})();
