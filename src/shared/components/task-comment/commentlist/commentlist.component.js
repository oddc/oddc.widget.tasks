(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('oddcCommentlist', {
            templateUrl: 'src/shared/components/task-comment/commentlist/commentlist.component.html',
            controllerAs: 'commentlist',
            bindings: {
                task: '<',
                comments: '<'
            }
        });

})();