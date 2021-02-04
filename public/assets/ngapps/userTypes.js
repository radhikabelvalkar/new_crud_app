const app = angular.module('userTypesApp', ['ui.bootstrap', 'ngSanitize', 'ngMessages']);

//Controller For Angular App
app.controller('userTypesAppCtrlr', ['$scope', '$http', '$uibModal', ($scope, $http, $uibModal) => {
    //Data Used For Controller
    $scope.fetchedDataList = [];
    //Method To Initialize Controller
    $scope.init = ()=>{
        $scope.getAllUserTypes();
    }

    //Method To Delete User Type
    $scope.deleteUserType = (userTypeId, index)=>{
        $http.delete(`/userTypes/${userTypeId}`).then((res)=>{
            $scope.fetchedDataList.splice(index, 1);
        }).catch((err)=>{
            console.warn(err);
        })
    }

    //Method To Get All Users
    $scope.getAllUserTypes = ()=>{
        $http.get('/userTypes/getAll').then((res)=>{
            $scope.fetchedDataList = res.data.userTypes;
        }).catch((err)=>{
            console.warn(err);
        })
    };

    //Method To Open Form Modal
    $scope.openFormModal = (mode, data, index) => {
        let formDataObj = {};
        if(mode === 'edit'){
            formDataObj = angular.copy(data);
            formDataObj.index = index;
        }
        formDataObj.mode = mode;
        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "modalForm",
            controller: "modalFormController",
            scope: $scope,
            backdrop: false,
            size: "lg",
            windowClass: "show",
            resolve: {
                record: function () {
                    return formDataObj;
                },
            },
        })
    }
}]);

//Controller For Modal Form
app.controller('modalFormController', ['$scope', '$http', 'record', '$window', ($scope, $http, record, $window) => {
    //Data Used For Controller
    $scope.formData = {};

    //Method To Init Controller
    function init(){
        $scope.formData = record;
    }

    init();

    //Method To Crearte User Type
    $scope.createUserType = ()=>{
        // $http.post('/userTypes', {name: $scope.name, description: $scope.description})
        $http.post('/userTypes', $scope.formData).then((res)=>{
            console.log(res);
            $scope.close();
            $scope.fetchedDataList.push(res.data.userType);
            // $window.location.reload();
            // $scope.getAllUserTypes();
        }).catch((err)=>{
            console.log(err);
        })
    }

    //Method To Edit User Type
    $scope.editUserType = ()=>{
        $http.put(`/userTypes/${$scope.formData._id}`, $scope.formData).then((res)=>{
            console.log(res);
            $scope.fetchedDataList[$scope.formData.index] = res.data.userType;
            $scope.close();
        }).catch((err)=>{
            console.log(err);
        })
    }

    //Method To Close Modal
    $scope.close = () => {
        $scope.modalInstance.close();
    }
}]);