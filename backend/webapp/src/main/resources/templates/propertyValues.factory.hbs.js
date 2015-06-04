angular.module('pb.generator.services').factory('propertyValuesFactory', function() {
  var identifiedPropertyValues = {};
  {{#each identifiedPropertyValues}}
  identifiedPropertyValues['{{ key }}'] =  {{ json this }};
  {{/each}}
  return {
    get: function(uuid) {
      return identifiedPropertyValues[uuid];
    }
  };
});
