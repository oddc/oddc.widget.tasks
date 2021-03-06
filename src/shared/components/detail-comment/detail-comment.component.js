(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('detailComment', {
            templateUrl: 'src/shared/components/detail-comment/detail-comment.component.html',
            controller: detailCommentController,
            controllerAs: 'detailCommentController'
        });

    detailCommentController.$inject = ['$log', '$state', '$stateParams', 'taskService', '$rootScope'];
    function detailCommentController($log, $state, $stateParams, taskService, $rootScope) {
        var vm = this;
        vm.service = taskService;
        vm.loading = true;
        vm.commentText = '';
        vm.$onInit = $onInit;
        vm.onAddComment = onAddComment;

        function $onInit() {
            if ($stateParams.id === '') {
                $state.go('task');
                return;
            }
            if (vm.service.getSelectedTask() === null) {
                vm.service
                    .requestTask($stateParams.id)
                    .catch(onReadTaskError);
            }

            $rootScope.$broadcast('rebuild:scrollbars');

            function onReadTaskError(error) {
                $log.error(error);
                $state.go('detail', {id: vm.service.getSelectedTask().taskId});
            }
        }

        function onAddComment($comment) {
            if ($comment && $comment.trim() !== '') {
                vm.service
                    .createComment(vm.service.getSelectedTask().id, $comment)
                    .catch(onCreateCommentError)
                    .finally(onCreateCommentDone);
            }

            function onCreateCommentError(error) {
                $log.error(error);
            }

            function onCreateCommentDone() {
                vm.commentText = '';
                $rootScope.$broadcast('rebuild:scrollbars');
            }
        }

    }


})();