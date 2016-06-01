/*jshint node:true*/
module.exports = {
  description: '',
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function(/*options*/) {
    // Perform extra work here.
    return this.addBowerPackageToProject('pubnub', '~3.7.18');
  }
};
