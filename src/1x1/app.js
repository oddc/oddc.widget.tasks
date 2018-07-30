(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks', ['widgetbuilder', 'slick', 'base64', 'ngFileUpload', 'ngStorage'])
        .config(stateMashineConfig)
        .run(runBlock);

    stateMashineConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function stateMashineConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('task', {
                url: '/tasklist/:listid',
                template: '<task-list-page></task-list-page>',
            })
            .state('task.edit', {
                url: '/edit',
                template: '<tasklist-edit></tasklist-edit>',
            })
            .state('task.delete', {
                url: '/delete',
                template: '<tasklist-delete></tasklist-delete>',
            })
            .state('task.add', {
                url: '/add',
                template: '<tasklist-add></tasklist-add>',
            })
            .state('detail', {
                url: '/tasks/{listid}/{taskid}',
                template: '<edit-page></edit-page>'
            })
            .state('detail.listdelete', {
                url: '/tasklist/delete',
                template: '<tasklist-delete></tasklist-delete>',
            })
            .state('detail.view', {
                url: '/view',
                template: '<oddc-tasklist></oddc-tasklist>'
            })
            .state('detail.edit', {
                url: '/edit',
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
            .state('detail.filedelete', {
                url: '/files/delete/{fileid}',
                template: '<task-files-delete></task-files-delete>'
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
                template: '<search-view></search-view>',
            })
            .state('search.result', {
                url: '/result/{search}',
                template: '<search-result></search-result>',
            });


        $urlRouterProvider.otherwise('/tasklist/');
    }

    runBlock.$inject = ['$rootScope', 'widgetState'];
    function runBlock($rootScope, widgetState) {
        $rootScope.$on('$stateChangeStart', onStateChangeStart);
        $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);

        function onStateChangeStart(event, toState, toParams, fromState, fromParams, options) {
            widgetState.setConfigValue('icon', '');
        }

        function onStateChangeSuccess(event, toState, toParams, fromState, fromParams) {
            $rootScope.$broadcast('scroll.bottom');
        }
    }
})();
