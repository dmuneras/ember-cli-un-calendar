import Ember from 'ember';

export default Ember.Controller.extend({
  month: moment(),
  showNextMonth: false,
  showPrevMotnh: false,
  multiple: true,

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
      this.set('currentDate', date);
    }
  }
});
