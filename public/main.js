'use strict';

var Hub = require('hubjs').Hub;
var React = require('react');
var roundTripRate = require('../');

var buttons = React.createClass({
  render: function () {
    var list = [];
    this.props.skills.forEach(function (skill, i) {
      var item = React.DOM.li({ key: 'key' + i },
        React.createElement(roundTripRate, {
          steps: 4,
          label: skill,
          cssClass: 'rating'
        }));
      list.push(item);
    });

    return (React.DOM.ul({ className: 'ratings' }, list));
  }
});

React.render(React.createElement(buttons, {
  skills: ['Java', 'JavaScript', 'Project Management', 'Adobe Photoshop',
    'Tennis', 'Html', 'UX Design', 'Keynote', 'Französisch']
}), document.querySelector('#content'));
