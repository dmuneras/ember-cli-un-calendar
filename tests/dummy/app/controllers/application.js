import Ember from 'ember';

export default Ember.Controller.extend({
  month: moment(),
  showNextMonth: false,
  showPrevMotnh: false,

  maxFutureDelivery: Ember.computed({
    get: function() {
      return moment().add(12,'months');
    }
  }).volatile(),

  actions: {
    dateeSelected: function(){
      console.log('date selected');
    }
  }
});