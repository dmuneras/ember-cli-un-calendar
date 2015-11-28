import Ember from 'ember';

export default Ember.Controller.extend({
  month: moment(),
  showNextMonth: false,
  showPrevMotnh: false,

  maxFutureDelivery: Ember.computed({
    get: function() {
      return moment().add(12, 'months');
    }
  }).volatile(),

  actions: {
    dateSelected: function(date) {
      console.log('date selected: ' + date.format('YYYY-MM-DD'));
    }
  }
});
