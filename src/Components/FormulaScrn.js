import React from 'react';

export default class FormulaScrn extends React.Component {
    render() {
      return (
        <div className="formula">{this.props.formula}</div>
      );
    }
  }