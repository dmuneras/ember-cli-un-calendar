import Ember from 'ember';
import layout from '../templates/components/un-calendar-month';

function containsDate(dates, date) {
  if (!dates || !Ember.get(dates, 'length')) {
    return false;
  }

  return dates.any(function(d) {
    return date.isSame(d, 'day');
  });
}

function forEachSlot(month, iter) {
  var totalDays  = month.daysInMonth(),
      firstDay   = month.clone().startOf('month').weekday(),
      currentDay = 1;

  function popCurrentDay() {
    if (currentDay > totalDays) {
      return null;
    } else {
      return moment([month.year(), month.month(), currentDay++]);
    }
  }

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
      throw 'you must provide selectedDates to un-calendar-month';
    }
  }),

  selectedDatesWhenInsert: Ember.on('didInsertElement', function() {
    this.setSelectedDates();
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

  selectedDatesDidChange: Ember.observer('selectedDates.@each', function() {
    Ember.run.scheduleOnce('afterRender', this, 'setSelectedDates');
  }),

  setSelectedDates: function() {
    var dates = this.get('selectedDates'),
        _this  = this,
        json;

    if (this._state !== 'inDOM') {
      return;
    }

    this.$('li').removeClass('is-selected');

    dates.forEach(function(date) {
      json = date.format('YYYY-MM-DD');
      _this.$('[data-date="' + json + '"]').addClass('is-selected');
    });
  },

  renderCalendar: function(buff) {
    let month = this.get('month'),
        _this = this;

    if (!month) {
      return;
    }

    function renderSlot(slot) {
      let attrs, template;

      if (slot) {
        attrs = {
          date:       slot.format('D'),
          jsonDate:   slot.format('YYYY-MM-DD'),
          classNames: ['un-calendar-slot', 'un-calendar-day']
        };

        _this.applyOptionsForDate(attrs, slot);

        template = '<li class="' + attrs.classNames.join(' ') + '" data-date="' + attrs.jsonDate + '">' + attrs.date + '</li>';

        buff.push(template);
      } else {
        buff.push('<li class="un-calendar-slot un-calendar-empty"></li>');
      }
    }

    forEachSlot(month, function(slot) {
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

    if (disabledDates && containsDate(disabledDates, date)) {
      options.classNames.push('is-disabled');
    }

    if (selectedDates && containsDate(selectedDates, date)) {
      options.classNames.push('is-selected');
    }
  },
});
