(function () {

    'use strict';

    angular
        .module('oddc.widget.tasks')
        .component('searchPage', {
            templateUrl: 'src/1x1/components/search-page/search-page.component.html',
            controller: searchPageController,
            controllerAs: 'ctrl'
        });

    searchPageController.$inject = ['widgetState', '$state', '$scope'];
    function searchPageController(widgetState, $state, $scope) {
        var vm = this;

        $scope.$watch(function () { return $state.current.name; }, function () {
            if ($state.current.name === 'search.result') {
                widgetState.setBackButtonState('search.view');
            }
            else {
                widgetState.setBackButtonState(null);
            }
        });


        vm.goToList = function () {
            $state.go('task', {listid: ''});
        };


    }

})();
