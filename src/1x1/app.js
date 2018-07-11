(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks', ['widgetbuilder', 'slick', 'base64', 'ngFileUpload'])
        .config(stateMashineConfig)
        .run(runBlock);

    stateMashineConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function stateMashineConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tasklist', {
                url: '/',
                template: '<task-list-page></task-list-page>',
                data: {
                    cssClassNames: 'list'
                }
            })
            .state('search', {
                url: '/search',
                template: '<search-page></search-page>',
                data: {
                    cssClassNames: 'list'
                }
            })
            .state('searchresult', {
                url: '/search/result/{search}',
                template: '<search-result-page></search-result-page>',
                data: {
                    cssClassNames: 'list'
                }
            })
            .state('addtasklist', {
                url: '/tasklist/add',
                template: '<add-list-page></add-list-page>',
                data: {
                    cssClassNames: 'list'
                }
            })
            .state('deletetasklist', {
                url: '/tasklist/delete/:id',
                template: '<tasklist-delete-page></tasklist-delete-page>',
                data: {
                    cssClassNames: 'list'
                }
            })
            .state('tasks', {
                url: '/tasks/:id',
                template: '<task-page></task-page>',
                data: {
                    cssClassNames: 'list'
                }
            })
            .state('taskadd', {
                url: '/task/add/:listid/:taskid',
                template: '<add-page></add-page>',
                data: {
                    cssClassNames: 'detail add'
                }
            })
            .state('taskedit', {
                url: '/task/edit/:listid/:taskid',
                template: '<edit-page></edit-page>',
                data: {
                    cssClassNames: 'detail edit'
                }
            })
            .state('taskedit.view', {
                url: '/view',
                template: '<task-add></task-add>',
                data: {
                    cssClassNames: 'detail view'
                }
            })
            .state('taskedit.comment', {
                url: '/comment',
                template: '<detail-comment></detail-comment>',
                data: {
                    cssClassNames: 'detail comment'
                }
            })
            .state('taskedit.files', {
                url: '/files',
                template: '<task-files></task-files>',
                data: {
                    cssClassNames: 'detail files'
                }
            })
            .state('taskedit.fileupload', {
                url: '/files/upload',
                template: '<task-files-upload></task-files-upload>',
                data: {
                    cssClassNames: 'detail files'
                }
            })
            .state('taskedit.subscriber', {
                url: '/add/subscriber',
                template: '<task-add-subscriber></task-add-subscriber>',
                data: {
                    cssClassNames: 'detail subscriber'
                }
            });


        $urlRouterProvider.otherwise('/');
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
