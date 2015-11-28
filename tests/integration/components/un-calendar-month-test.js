import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('un-calendar-month', 'Integration | Component | un calendar month', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{un-calendar-month}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#un-calendar-month}}
      template block text
    {{/un-calendar-month}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
