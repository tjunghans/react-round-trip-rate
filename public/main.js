'use strict';

var React = require('react');
var roundTripRate = require('../');

var buttons = React.createClass({
  render: function () {
    var list = this.props.skills.map(function (skill, i) {
      return React.DOM.li({ key: 'key' + i },
        React.createElement(roundTripRate, {
          steps: 3,
          label: skill,
          cssClass: 'rating'
        }));
    });
    return (React.DOM.ul({ className: 'ratings' }, list));
  }
});

React.render(React.createElement(buttons, {
  skills: ['Java', 'JavaScript', 'Project Management', 'Adobe Photoshop',
    'Tennis', 'Html', 'UX Design', 'Keynote', 'Französisch']
}), document.querySelector('#content'));
