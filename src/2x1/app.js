(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks', ['widgetbuilder', 'slick', 'base64', 'ngFileUpload'])
        .config(stateMashineConfig);

    stateMashineConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function stateMashineConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('task', {
                url: '/tasklist/:listid',
                template: '<index-page></index-page>'
            })
            .state('task.view', {
                url: '/tasklist/view',
                template: '<oddc-tasklist></oddc-tasklist>'
            })
            .state('task.delete', {
                url: '/tasklist/delete',
                template: '<tasklist-delete></tasklist-delete>',
            })
            .state('task.add', {
                url: '/tasklist/add',
                template: '<tasklist-add></tasklist-add>',
            })
            .state('detail', {
                url: '/task/:listid/:taskid',
                template: '<tasks-page></tasks-page>'
            })
            .state('detail.view', {
                url: '/view',
                template: '<task-add></task-add>'
            })
            .state('detail.files', {
                url: '/files',
                template: '<task-files></task-files>'
            })
            .state('detail.comments', {
                url: '/comments',
                template: '<detail-comment></detail-comment>'
            })
            .state('detail.delete', {
                url: '/delete',
                template: '<detail-delete></detail-delete>'
            })
            .state('detail.filesdetails', {
                url: '/files/details/{fileid}',
                template: '<task-files-details></task-files-details>',
            })
            .state('detail.fileupload', {
                url: '/files/upload',
                template: '<task-files-upload></task-files-upload>',
            })
            .state('detail.subscriber', {
                url: '/add/subscriber',
                template: '<task-add-subscriber></task-add-subscriber>',
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
            });

        $urlRouterProvider.otherwise('/tasklist/');
    }

})();
