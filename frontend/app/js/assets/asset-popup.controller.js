(function () {

  angular.module('pb.assets').controller('AssetPopupCtrl', function ($scope, $modalInstance, alerts, assets, asset, mode, artifact) {

    'use strict';

    var urlPrefixForLocalAsset = 'rest/' + mode + 's/' + artifact.id + '/assets/';

    $scope.asset = asset;
    $scope.isNewAsset = asset===undefined;

    //All datas (type, places) are defined in the assets service.
    $scope.assetTypes = assets.getTypes();
    $scope.assetPlaces = assets.getPlaces();
    $scope.externalPlace = assets.getExternalPlace();

    //Asset is converted in another object for the html form
    $scope.newAsset = assets.assetToForm(asset);

    //The form action target is not the same according to the asset type : css, js or img
    $scope.$watch('newAsset.type', function(newValue) {
      $scope.assetSavingAction = urlPrefixForLocalAsset + newValue;
    });

    /**
     * An external asset is saved by a $http call
     */
    $scope.saveExternalAsset = function(data) {
      $modalInstance.close(data);
    };

    /**
     * An local asset (file) is saved by the submit of the html form
     */
    $scope.onSuccess = function(response) {
      //Even if a problem occurs in the backend a response is sent with a message
      //If the message has a type and a message this an error
      if(response && response.type && response.message){
        alerts.addError(response);
      }
      $modalInstance.close();
    };

    /**
     * If an error occured on saving, the message is displayed in alerts area
     */
    $scope.onError = function(error) {
      alerts.addError(error);
      $modalInstance.dismiss('cancel');
    };

    /**
     * User clicked on Cancel button
     */
    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

   });

})();