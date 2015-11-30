/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-un-calendar',
  included: function(app) {
    this._super.included(app);

    if (app.options.unCalendar && app.options.unCalendar.defaultStyles) {
      this.app.import('vendor/styles/ember-cli-un-calendar.css');
    }
  },

  afterInstall: function() {
    return this.addBowerPackageToProject('moment');
  },
};
