import Ember from 'ember';
import layout from '../templates/components/un-calendar-month';
import moment from 'moment';

export default Ember.Component.extend({
  layout: layout,
  tagName:      'ol',
  classNames:   'un-calendar-month',
  month:         null,
  selectedDates: null,
  disabledDates: null,
  addDateNameOnTop: true,

  validateSelectedDates: Ember.on('init', function() {
    if (!this.get('selectedDates')) {
      this.set('selectedDates', Ember.A([]));
    }else {
      this.set('selectedDates', Ember.A(this.get('selectedDates')));
    }
  }),

  selectedDatesFormatted: Ember.computed('selectedDates.[]', {
    get: function() {
      return Ember.A(this.get('selectedDates').map(function(date) {
        return date.format('YYYY-MM-DD');
      }));
    }
  }),

  selectedDatesFormattedChanged: Ember.observer('selectedDatesFormatted.[]', function() {
    this.get('selectedDatesFormatted').forEach((date) => {
      this.$('.un-calendar-day[data-date="' + date + '"]').addClass('is-selected');
    });
  }),

  addCalendar: Ember.on('willRender', function() {
    let localBuffer = [];
    if (this.get('addDateNameOnTop')) {
      localBuffer = this.addDayNamesToLocalBuffer();
    }

    this.set('calendarHTML', this.renderCalendar(localBuffer).join(''));
  }),

  addDayNamesToLocalBuffer: function() {
    let localBuffer = [];
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(function(day) {
      localBuffer.push('<li class = "un-calendar-slot">' + day + '</li>');
    });

    return localBuffer;
  },

  click: function(event) {
    var $target = Ember.$(event.target);

    if ($target.is('.is-disabled')) {
      return;
    }

    if ($target.is('[data-date]')) {
      this.sendAction('select', moment($target.data('date'), 'YYYY-MM-DD'));
    }
  },

  renderCalendar: function(buff) {
    let month = this.get('month'),
        _this = this;

    if (!month) {
      return;
    }

    let renderSlot = function(slot) {
      let attrs, template;

      if (slot) {
        attrs = {
          date:       slot.format('D'),
          jsonDate:   slot.format('YYYY-MM-DD'),
          classNames: ['un-calendar-slot', 'un-calendar-day']
        };

        if (_this.get('selectedDatesFormatted').contains(attrs.jsonDate)) {
          attrs.classNames.push('is-selected');
        }

        _this.applyOptionsForDate(attrs, slot);

        template = '<li class="' + attrs.classNames.join(' ') + '" data-date="' + attrs.jsonDate + '">' + attrs.date + '</li>';

        buff.push(template);
      } else {
        buff.push('<li class="un-calendar-slot un-calendar-empty"></li>');
      }
    };

    this.forEachSlot(month, function(slot) {
      renderSlot(slot);
    });

    return buff;
  },

  applyOptionsForDate: function(options, date) {
    var disabledDates = this.get('disabledDates'),
        selectedDates = this.get('selectedDates');

    if (moment().isSame(date, 'day')) {
      options.classNames.push('is-today');
    }

    if (disabledDates && this.containsDate(disabledDates, date)) {
      options.classNames.push('is-disabled');
    }

    if (selectedDates && this.containsDate(selectedDates, date)) {
      options.classNames.push('is-selected');
    }
  },

  containsDate: function(dates, date) {
    if (!dates || !Ember.get(dates, 'length')) {
      return false;
    }

    return Ember.A(dates).any(function(d) {
      return date.isSame(d, 'day');
    });
  },

  forEachSlot: function(month, iter) {
    let totalDays  = month.daysInMonth(),
        firstDay   = month.clone().startOf('month').weekday(),
        currentDay = 1;

    let popCurrentDay =  function() {
      if (currentDay > totalDays) {
        return null;
      } else {
        return moment([month.year(), month.month(), currentDay++]);
      }
    };

    for (var week = 0; week <= 6; week++) {
      for (var day = 0; day <= 6; day++) {
        if (week === 0) {
          iter(day < firstDay ? null : popCurrentDay());
        } else {
          iter(currentDay <= totalDays ? popCurrentDay() : null);
        }
      }

      if (currentDay > totalDays) {
        break;
      }
    }
  }
});
