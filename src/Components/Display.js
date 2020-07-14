import React from 'react';
import FormulaScrn from './FormulaScrn';
import Value from './Value'

export default class Display extends React.Component {
    
  render() {
    const {formula, value, outputSize} = this.props;

    return (
      <div className="display">
        <FormulaScrn formula={formula} />
        <Value outputSize={outputSize} value={value} /> 
      </div>
    );
  }
}