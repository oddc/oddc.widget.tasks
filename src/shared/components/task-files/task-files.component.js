(function () {

    'use strict';

    angular.module('oddc.widget.tasks')
        .component('taskFiles', {
            templateUrl: 'src/shared/components/task-files/task-files.component.html',
            controller: taskFilesController,
            controllerAs: 'ctrl',
        });

    taskFilesController.$inject = ['taskService', '$stateParams', 'widgetState'];
    function taskFilesController(taskService, $stateParams, widgetState) {
        var vm = this;
        vm.$onInit = $onInit;
        vm.tasklist = {};
        vm.files = [];


        function $onInit() {
            vm.files = [
                { id: 1465, name: 'datei0.pdf', path: '/files/datei0.pdf', uploadDate: '11.07.2018' },
                { id: 1464, name: 'datei1.pdf', path: '/files/datei1.pdf', uploadDate: '10.07.2018' },
                { id: 1463, name: 'datei2.pdf', path: '/files/datei2.pdf', uploadDate: '09.07.2018' },
                { id: 1462, name: 'datei3.pdf', path: '/files/datei3.pdf', uploadDate: '08.07.2018' },
                { id: 1461, name: 'datei4.pdf', path: '/files/datei4.pdf', uploadDate: '07.07.2018' },
                { id: 1460, name: 'datei5.pdf', path: '/files/datei5.pdf', uploadDate: '06.07.2018' },
                { id: 1459, name: 'datei6.pdf', path: '/files/datei6.pdf', uploadDate: '05.07.2018' },
                { id: 1458, name: 'datei7.pdf', path: '/files/datei7.pdf', uploadDate: '04.07.2018' },
                { id: 1457, name: 'datei8.pdf', path: '/files/datei8.pdf', uploadDate: '03.07.2018' },
                { id: 1456, name: 'datei9.pdf', path: '/files/datei9.pdf', uploadDate: '02.07.2018' }
            ];
        }


        vm.uploadFile = function () {
            widgetState.go('taskedit.fileupload');
        };

        vm.openFile = function (fileid) {
            widgetState.go('taskedit.filesdetails', { fileid: fileid});
        };
    }



})();