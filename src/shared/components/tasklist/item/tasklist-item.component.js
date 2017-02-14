(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('oddcTasklistItem', {
            templateUrl: 'src/shared/components/tasklist/item/tasklist-item.component.html',
            controller: tasklistItemController,
            controllerAs: 'tasklistitem',
            bindings: {
                task: '<',
                onStatusChange: '&',
                onSelectTask: '&'
            }
        });

    function tasklistItemController() {
        this.onClickCheckbox = onClickCheckbox;

        function onClickCheckbox(event) {
            event.stopPropagation();
        }
    }

})();
