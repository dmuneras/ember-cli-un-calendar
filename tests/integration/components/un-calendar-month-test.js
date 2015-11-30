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
  }
);
