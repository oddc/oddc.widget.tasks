(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks', ['widgetbuilder'])
        .config(stateMashineConfig)
        .run(runBlock);

    stateMashineConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function stateMashineConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('task', {
                url: '/task',
                template: '<task-list-page></task-list-page>',
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

        $urlRouterProvider.otherwise('/task');
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
