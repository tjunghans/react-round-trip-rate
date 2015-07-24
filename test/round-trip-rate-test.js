/*globals describe, it, beforeEach, afterEach, Event */
/*jshint maxstatements:false */
'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var assert = require('assert');
var sinon = require('sinon');
var roundTripRate = require('../');

function $(selector, context) {
  context = context || document;
  return context.querySelectorAll(selector);
}

function prepare(config) {
  if (config.steps === undefined) {
    config.steps = 3;
  }
  if (config.label === undefined) {
    config.label = 'Java';
  }
  if (config.cssClass === undefined) {
    config.cssClass = 'rating';
  }
  return config;
}

describe('component', function () {
  var div;

  function render(config) {
    React.render(React.createElement(roundTripRate, prepare(config)), div);
  }

  beforeEach(function () {
    div = document.createElement("div");
  });

  afterEach(function () {
    if (div) {
      React.unmountComponentAtNode(div);
    }
  });

  it('renders button', function () {
    render({});

    assert.equal($('button.rating', div).length, 1);
  });

  it('renders indicator', function () {
    render({ steps: 5 });

    assert.equal($('.indicator .bar', div).length, 5);
  });

  it('fires onChange', function () {
    var spy = sinon.spy();
    render({ onChange: spy, label: 'JavaScript' });
    var button = $('button.rating', div)[0];

    TestUtils.SimulateNative.click(button);

    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, 'JavaScript', 1);
  });

  it('activates indicator bars', function () {
    var steps = 5;
    render({ steps: steps });
    var button = $('button.rating', div)[0];
    var i;

    for (i = 0; i < steps; i++) {
      TestUtils.SimulateNative.click(button);

      assert.equal($('.indicator .active', div).length, i + 1);
    }
  });

  it('resets button indicator after maximum', function () {
    render({ steps: 3 });
    var button = $('button.rating', div)[0];
    TestUtils.SimulateNative.click(button);
    TestUtils.SimulateNative.click(button);
    TestUtils.SimulateNative.click(button);

    assert.equal($('.indicator .active', div).length, 3);

    TestUtils.SimulateNative.click(button);

    assert.equal($('.indicator .active', div).length, 0);
  });

});

