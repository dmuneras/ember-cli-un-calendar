/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-un-calendar',
  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/moment/moment.js');
  },
  afterInstall: function() {
    return this.addBowerPackageToProject('moment');
  },
};
