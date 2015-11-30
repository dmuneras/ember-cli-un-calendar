/* jshint expr:true */
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

    it('renders month slots', function() {
      this.set('month', moment('11-11-2015', 'MM-DD-YYYY'));
      this.render(hbs`{{un-calendar-month month=month}}`);
      expect(this.$('.un-calendar-slot')).to.have.length(42);
      expect(this.$('.un-calendar-day')).to.have.length(30);
    });
  }
);
