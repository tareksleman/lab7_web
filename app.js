// Define the AngularJS module named "photoApp"
var photoApp = angular.module("photoApp", []);

// Define the controller named "GalleryController"
photoApp.controller("GalleryController", function ($scope, $http) {
  // Initialize variables to store thumbnail list and selected full-size image
  $scope.thumbnailList = [];
  $scope.selectedImage = null;

  // Function to retrieve thumbnails from the Picsum Photos API
  $http.get("https://picsum.photos/v2/list?limit=80")
    .then(function (response) {
      // Process the received thumbnail data
      response.data.forEach(function (item) {
        item.thumbnailLink = `https://picsum.photos/id/${item.id}/50/50`;
      });
      // Assign the processed thumbnail data to $scope.thumbnailList
      $scope.thumbnailList = response.data;
    })
    .catch(function (error) {
      // Handle errors if retrieving thumbnails fails
      console.error("Error retrieving thumbnails:", error);
    });

  // Function to display full-size image when a thumbnail is clicked
  $scope.displayFullImage = function (image) {
    $scope.selectedImage = {
      id: image.id,
      fullImageUrl: `https://picsum.photos/id/${image.id}/350/350`,
    };
  };
});
