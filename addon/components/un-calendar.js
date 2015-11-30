import Ember from 'ember';
import layout from '../templates/components/un-calendar';

export default Ember.Component.extend({
  layout: layout,
  classNames: 'un-calendar',

  prevLabel:           '&larr;',
  nextLabel:           '&rarr;',
  todayLabel:          'Today',
  showNextMonth:       true,
  showPrevMonth:       true,
  disableHeader:       false,
  disableControls:     false,
  disableTodayButton:  false,
  multiple:            false,
  disablePast:         null,
  disableFuture:       null,
  disableManipulation: null,
  maxPastDate:         null,
  maxFutureDate:       null,
  month:               null,
  disabledDates:       null,
  selectedDates:       null,
  selectedDate:        null,

  initFuction: Ember.on('init', function() {
    if (!this.get('selectedDates')) {
      this.set('selectedDates', Ember.A([]));
    } else {
      this.set('multiple', true);
    }

    if (this.get('selectedDate')) {
      this.get('selectedDates').addObject(this.get('selectedDate'));
    }

    var firstSelectedDate = this.get('selectedDates.firstObject');

    if (!this.get('month') && firstSelectedDate) {
      this.set('month', firstSelectedDate.clone().startOf('month'));
    }

    if (!this.get('month')) {
      this.set('month', moment().startOf('month'));
    }
  }),

  selectedDateWillChange: Ember.observer('selectedDate', function() {
    this.removeDate(this.get('selectedDate'));
  }),

  selectedDateDidChange: Ember.observer('selectedDates', function() {
    var date = this.get('selectedDate');

    if (!date) {
      return;
    }

    this.addDate(this.get('selectedDate'));
  }),

  now: Ember.computed({
    get: function() {
      return moment();
    }
  }),

  prevMonth: Ember.computed('month', {
    get: function() {
      var month = this.get('month');
      return month ? month.clone().subtract(1, 'months') : null;
    }
  }),

  nextMonth: Ember.computed('month', {
    get: function() {
      var month = this.get('month');
      return month ? month.clone().add(1, 'months') : null;
    }
  }),

  isNextMonthInFuture: Ember.computed('nextMonth', 'now', {
    get: function() {
      var nextMonth = this.get('nextMonth'),
          now       = this.get('now');
      return nextMonth ? nextMonth.isAfter(now, 'month') : false;
    }
  }),

  isPrevMonthInPast: Ember.computed('prevMonth', 'now', {
    get: function() {
      var prevMonth = this.get('prevMonth'),
        now       = this.get('now');
      return prevMonth ? prevMonth.isBefore(now, 'month') : false;
    }
  }),

  isPrevMonthBeyondMax: Ember.computed('prevMonth', 'maxPastDate', {
    get: function() {
      var prevMonth   = this.get('prevMonth'),
        maxPastDate = this.get('maxPastDate');

      if (!prevMonth || !maxPastDate) {
        return false;
      }

      return prevMonth.isBefore(maxPastDate, 'month');
    }
  }),

  isNextMonthBeyondMax: Ember.computed('nextMonth', 'maxFutureDate', {
    get: function() {
      var nextMonth     = this.get('nextMonth'),
        maxFutureDate = this.get('maxFutureDate');

      if (!nextMonth || !maxFutureDate) {
        return false;
      }

      return nextMonth.isAfter(maxFutureDate, 'month');
    }
  }),

  isPrevDisabled: Ember.computed('isPrevMonthBeyondMax', 'isPrevMonthInPast', 'disablePast', {
    get: function() {
      if (this.get('isPrevMonthBeyondMax')) {
        return true;
      }

      if (this.get('disablePast') && this.get('isPrevMonthInPast')) {
        return true;
      }

      return false;
    }
  }),

  isNextDisabled: Ember.computed('isNextMonthBeyondMax', 'isNextMonthInFuture', 'disableFuture', {
    get: function() {
      if (this.get('isNextMonthBeyondMax')) {
        return true;
      }

      if (this.get('disableFuture') && this.get('isNextMonthInFuture')) {
        return true;
      }

      return false;
    }
  }),

  prevMonthLabel: Ember.computed('prevMonth', {
    get: function() {
      return this.cpFormatMoment('prevMonth', 'MMMM YYYY');
    }
  }),

  nextMonthLabel: Ember.computed('nextMonth', {
    get: function() {
      return this.cpFormatMoment('nextMonth', 'MMMM YYYY');
    }
  }),

  monthLabel: Ember.computed('month', {
    get: function() {
      return this.cpFormatMoment('month', 'MMMM YYYY');
    }
  }),

  hasDate: function(date) {
    return this.get('selectedDates').any(function(d) {
      return d.isSame(date);
    });
  },

  removeDate: function(date) {
    var dates = this.get('selectedDates');
    var removeDates;

    removeDates = dates.filter(function(d) {
      return d.isSame(date);
    });

    dates.removeObjects(removeDates);
  },

  addDate: function(date) {
    this.removeDate(date);
    this.get('selectedDates').pushObject(date);
  },

  cpFormatMoment: function(key, format) {
    var date = this.get(key);
    return date ? date.format(format) : null;
  },

  actions: {
    dateSelected: function(date) {
      this.sendAction('select', date);

      if (this.get('disableManipulation')) {
        return;
      }

      if (this.get('multiple')) {
        if (this.hasDate(date)) {
          this.removeDate(date);
        } else {
          this.addDate(date);
        }
      } else {
        if (this.hasDate(date)) {
          this.set('selectedDate', null);
        } else {
          this.set('selectedDate', date);
        }
      }
    },

    prev: function() {
      var month = this.get('month');

      if (!month || this.get('isPrevDisabled')) {
        return;
      }

      this.set('month', month.clone().subtract(1, 'months'));
    },

    next: function() {
      var month = this.get('month');

      if (!month || this.get('isNextDisabled')) {
        return;
      }

      this.set('month', month.clone().add('months', 1));
    },

    today: function() {
      this.set('month', moment());
    }
  },

});
