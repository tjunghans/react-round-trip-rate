'use strict';

var React = require('react/addons');

var indicator = React.createClass({
  displayName: 'indicator',
  propTypes: {
    levels: React.PropTypes.number.isRequired,
    level: React.PropTypes.number.isRequired
  },
  render: function () {
    var items = [];
    var i;
    var className;
    var len = this.props.levels;
    var bar = String.fromCharCode(9604);
    for (i = 0; i < len; i++) {
      className = i < this.props.level ? 'bar active' : 'bar';
      items.push(React.DOM.span({
        className: className,
        key: i
      },
        bar));
    }
    return (
      React.DOM.div({ className: 'indicator' }, items)
    );
  }
});

module.exports = React.createClass({
  displayName: 'round-trip-rate',
  propTypes: {
    steps: React.PropTypes.number,
    label: React.PropTypes.string,
    cssClass: React.PropTypes.string,
    onChange: React.PropTypes.func
  },
  getDefaultProps: function () {
    return {
      steps: 3,
      label: ''
    };
  },
  getInitialState: function () {
    return {
      rating: 0
    };
  },
  render: function () {
    var cssClassNames = [];
    if (this.props.cssClass) {
      cssClassNames.push(this.props.cssClass);
    }
    cssClassNames.push('rating-' + this.state.rating);

    return (
      React.DOM.button({
        onClick: this.incrementRating,
        className: cssClassNames.join(' ')
      },
        React.DOM.span(null, this.props.label),
        React.createElement(indicator, {
          level: this.state.rating,
          levels: this.props.steps
        })
        )
    );
  },
  incrementRating: function () {
    var rating = this.state.rating;
    if (++rating === (this.props.steps + 1)) {
      rating = 0;
    }
    this.setState({ rating: rating });
    if (this.props.onChange) {
      this.props.onChange(this.props.label, rating);
    }
  }
});
