(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks', ['widgetbuilder'])
        .config(stateMashineConfig);

    stateMashineConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function stateMashineConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('task', {
                url: '/task',
                template: '<index-page></index-page>'
            })
            .state('detail', {
                url: '/task/:id',
                template: '<index-page></index-page>'
            })
            .state('detail.view', {
                url: '/view',
                template: '<detail-view></detail-view>'
            })
            .state('detail.assign', {
                url: '/assign',
                template: '<detail-assign></detail-assign>'
            })
            .state('detail.comments', {
                url: '/comments',
                template: '<detail-comment></detail-comment>'
            })
            .state('detail.delete', {
                url: '/delete',
                template: '<detail-delete></detail-delete>'
            });

        $urlRouterProvider.otherwise('/task');
    }

})();
