import React from 'react';


export default class Value extends React.Component {
    render() {
      return (
        <div className="output">{this.props.value}</div>
      );
    }
  }