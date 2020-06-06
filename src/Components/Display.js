import React from 'react';
import FormulaScrn from './FormulaScrn';
import Value from './Value'

export default class Display extends React.Component {
    render() {
      return (
        <div className="display">
          <FormulaScrn formula={this.props.formula} />
          <Value outputSize={this.props.outputSize} value={this.props.value} /> 
        </div>
      );
    }
  }