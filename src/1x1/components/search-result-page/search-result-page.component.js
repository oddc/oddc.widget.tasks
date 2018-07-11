(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('searchResultPage', {
            templateUrl: 'src/1x1/components/search-result-page/search-result-page.component.html',
            controller: searchResultPageController,
            controllerAs: 'ctrl'
        });

    searchResultPageController.$inject = ['widgetState'];
    function searchResultPageController(widgetState) {
        var vm = this;
        vm.$onInit = $onInit;

        function $onInit() {
            widgetState.setBackButtonState('tasklist');
        }

    }

})();
