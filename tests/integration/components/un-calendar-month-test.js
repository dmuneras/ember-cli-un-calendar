/* jshint expr:true */
import Ember from  'ember';
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'un-calendar-month',
  'Integration: UnCalendarMonth',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#un-calendar-month}}
      //     template content
      //   {{/un-calendar-month}}
      // `);
      this.set('month', moment());
      this.render(hbs`{{un-calendar-month month=month}}`);
      expect(this.$()).to.have.length(1);
    });

    it('renders the correct number of month slots when addDateNameOnTop is set to true', function() {
      this.set('month', moment('11-11-2015', 'MM-DD-YYYY'));
      this.render(hbs`{{un-calendar-month month=month}}`);
      expect(this.$('.un-calendar-slot')).to.have.length(42);
      expect(this.$('.un-calendar-day')).to.have.length(30);
    });

    it('renders the correct number of month slots when addDateNameOnTop is set to false', function() {
      this.set('month', moment('11-11-2015', 'MM-DD-YYYY'));
      this.set('addDateNameOnTop', false);
      this.render(hbs`{{un-calendar-month month=month addDateNameOnTop=addDateNameOnTop}}`);
      expect(this.$('.un-calendar-slot')).to.have.length(35);
      expect(this.$('.un-calendar-day')).to.have.length(30);
    });

    it('sets selectedDatesFormatted', function() {
      this.set('month', moment('11-11-2015', 'MM-DD-YYYY'));
      this.set('selectedDates', [this.get('month')]);
      this.render(hbs`{{un-calendar-month month=month selectedDates=selectedDates}}`);
      Ember.run.later(function() {
        expect(this.get('selectedDatesFormatted').get('firstObject').format('MM-DD-YYYY')).to.eq('11-11-2015');
      });
    });

    it('on click correct date is send', function() {
      this.set('month', moment('11-11-2015', 'MM-DD-YYYY'));
      this.on('dateSelected', function(date) {
        expect(date).to.eq('11-11-2015');
      });

      this.render(hbs`{{un-calendar-month month=month}}`);
    });

    it('on click selectedDates is updated', function() {
      this.set('month', moment('11-11-2015', 'MM-DD-YYYY'));
      this.on('dateSelected', () => {
        Ember.run.later(() => {
          expect(this.get('selectedDates').get('firstObject').format('MM-DD-YYYY')).to.eq('11-11-2015');
        });

      });

      this.render(hbs`{{un-calendar-month month=month}}`);
    });
  }
);
