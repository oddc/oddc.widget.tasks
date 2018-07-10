(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('searchPage', {
            templateUrl: 'src/1x1/components/search-page/search-page.component.html',
            controller: searchPageController,
            controllerAs: 'ctrl'
        });

    searchPageController.$inject = ['widgetState'];
    function searchPageController(widgetState) {
        var vm = this;

        function $onInit() {
        }

    }

})();
