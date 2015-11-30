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

  selectedDates: Ember.computed({
    get: function() {
      return [moment().add(1, 'days')];
    }
  }),

  disabledDates: Ember.computed({
    get: function() {
      return [moment().add(2, 'days')];
    }
  }),

  actions: {
    dateSelected: function(date) {
      console.log('date selected: ' + date.format('YYYY-MM-DD'));
    }
  }
});
