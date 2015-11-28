module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('moment');
  },
  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/moment/moment.js');
  }
};