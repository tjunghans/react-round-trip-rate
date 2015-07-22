'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  displayName: 'round-trip-rate',
  propTypes: {
    steps: React.PropTypes.number,
    label: React.PropTypes.string,
    cssClass: React.PropTypes.string
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
        React.DOM.span(null, String.fromCharCode(43) + ' '),
        React.DOM.span(null, this.props.label)
        )
    );
  },
  incrementRating: function () {
    var rating = this.state.rating;
    if (++rating === this.props.steps) {
      rating = 0;
    }
    this.setState({ rating: rating });
  }
});
