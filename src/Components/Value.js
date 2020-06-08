import React from 'react';

export default class Value extends React.Component {
    render() {
      const style = {
        fontSize: this.props.outputSize + "em",
        
      };
      
      return (
        <div className="output" style={style}>{this.props.value}</div>
      );
    }
  }