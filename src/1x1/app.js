(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks', ['widgetbuilder'])
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
            .state('tasks', {
                url: '/tasks/:id',
                template: '<task-page></task-page>',
                data: {
                    cssClassNames: 'list'
                }
            })
            .state('detail', {
                url: '/task/:id',
                template: '<detail-page></detail-page>',
                data: {
                    cssClassNames: 'detail'
                }
            })
            .state('taskadd', {
                url: '/task/add/:id',
                template: '<add-page></add-page>',
                data: {
                    cssClassNames: 'detail add'
                }
            })
            .state('detail.view', {
                url: '/view',
                template: '<detail-view></detail-view>',
                data: {
                    cssClassNames: 'detail view'
                }
            })
            .state('detail.assign', {
                url: '/assign',
                template: '<detail-assign></detail-assign>',
                data: {
                    cssClassNames: 'detail assign'
                }
            })
            .state('detail.comment', {
                url: '/comment',
                template: '<detail-comment></detail-comment>',
                data: {
                    cssClassNames: 'detail comment'
                }
            })
            .state('detail.delete', {
                url: '/delete',
                template: '<detail-delete></detail-delete>',
                data: {
                    cssClassNames: 'detail delete'
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
