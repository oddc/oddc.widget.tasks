(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks', ['widgetbuilder', 'slick', 'base64', 'ngFileUpload', 'ngStorage'])
        .config(stateMashineConfig);

    stateMashineConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function stateMashineConfig($stateProvider, $urlRouterProvider) {
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
                url: '/tasks/:listid/:taskid',
                template: '<tasks-page></tasks-page>'
            })
            .state('tasks.listdelete', {
                url: '/listdelete',
                template: '<tasklist-delete></tasklist-delete>'
            })
            .state('tasks.task', {
                url: '/task',
                template: '<task></task>'
            })
            .state('tasks.comments', {
                url: '/comments',
                template: '<task-comment></task-comment>'
            });

        $urlRouterProvider.otherwise('/tasklist/view/');
    }

})();
