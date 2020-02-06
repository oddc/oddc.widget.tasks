(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks', ['widgetbuilder', 'slick', 'base64', 'ngFileUpload', 'ngStorage', 'ui-notification'])
        .config(stateMashineConfig);

    stateMashineConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'NotificationProvider'];
    function stateMashineConfig($stateProvider, $urlRouterProvider, NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 3000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });

        $stateProvider
            .state('tasklist', {
                url: '/tasklist',
                template: '<tasklist-page></tasklist-page>'
            })
            .state('tasklist.view', {
                url: '/view/:listid',
                template: '<tasklist></tasklist>'
            })
            .state('tasklist.add', {
                url: '/add',
                template: '<tasklist-add></tasklist-add>'
            })
            .state('search', {
                url: '/search',
                template: '<search-page></search-page>',
            })
            .state('search.view', {
                url: '/view',
                template: '<search-page></search-page>',
            })
            .state('search.result', {
                url: '/result/{search}',
                template: '<search-page></search-page>',
            })
            .state('tasks', {
                url: '/tasks/:listid',
                template: '<tasks-page></tasks-page>'
            })
            .state('tasks.list', {
                url: '/task/:taskid',
                template: '<task></task>'
            })
            .state('tasks.listdelete', {
                url: '/listdelete',
                template: '<tasklist-delete></tasklist-delete>'
            })
            .state('tasks.task', {
                url: '/task/:taskid',
                template: '<task></task>'
            })
            .state('tasks.comments', {
                url: '/comments/:taskid',
                template: '<task-comment></task-comment>'
            })
            .state('tasks.delete', {
                url: '/delete/:taskid',
                template: '<task-delete></task-delete>'
            })
            .state('tasks.subscriber', {
                url: '/subscriber/:taskid',
                template: '<task-add-subscriber></task-add-subscriber>',
            })
            .state('tasks.files', {
                url: '/files/:taskid',
                template: '<task-files></task-files>'
            })
            .state('tasks.filesdetails', {
                url: '/files/:taskid/details/:fileid',
                template: '<task-files-details></task-files-details>',
            })
            .state('tasks.fileupload', {
                url: '/files/:taskid/upload',
                template: '<task-files-upload></task-files-upload>',
            })
            .state('tasks.filedelete', {
                url: '/files/:taskid/delete/:fileid',
                template: '<task-files-delete></task-files-delete>'
            });

        $urlRouterProvider.otherwise('/tasklist/view/');
    }

})();
