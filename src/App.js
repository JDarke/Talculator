import React from 'react';
import './index.css';
import Buttons from './Components/Buttons'
import Display from './Components/Display'


let ceRegex = new RegExp(/\d+$|(\d+[\+x\/-])$/);
let opRegex = new RegExp(/[+x\/-]{1,}$/);
let evalRegex = new RegExp(/[+*\/-]+$/);


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        prevValue: '0',
        formula: '',
        sign: '+',
        last: '',
        output: '',
        evald: false,
        maxChars: 10
        
    };
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleSign = this.handleSign.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEval = this.handleEval.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.reset = this.reset.bind(this);

  }
  
  reset() {
    this.setState({
        value: '',
        prevValue: '0',
        formula: '',
        sign: '+',
        last: '',
        output: '',
        evald: false
    });
  }
  
  handleNumbers(e) {
      var value = this.state.value;
      var output;
      if (!this.state.evald) {
        if (value.length < this.state.maxChars-1) {
          value += e.target.value;
          output = parseFloat(value);
          this.setState({
            value: value,
            output: output.toLocaleString()
          }); 
        }
      } else {
          this.setState({
            value: e.target.value,
            prevValue: '0',
            formula: '',
            sign: '+',
            last: '',
            output: '',
            evald: false
          });
      }
  }
  
  handleSign(e) {
    
  }

  
  
  handleOperator(e) {
    var value = this.state.value 
    var formula = this.state.formula
    if (!formula.match(opRegex)) {
      value += e.target.value;
    }
      
    if (!this.state.evald) {
      this.setState({
        prevValue: this.state.value,
        value: '',
        output: '',
        formula: formula + value.replace('±','')
      });
    } else {
        this.setState({
          prevValue: '',
          value: '',
          formula: this.state.formula + e.target.value.replace(',','').replace('±',''),
          evald: false
        });
    }
    //console.log(this.state)
  }
  
  handleEval(e) {
    var value = this.state.value;
    var formula = this.state.formula;
    
    if (!this.state.evald) {
      if (this.state.value !== '') {
        this.setState({
           value: '',
           formula: formula + value
        });
      }
      formula = formula.replace('x', '*');
      formula = formula.replace(evalRegex, '');
      
      try {
        var answer = eval(formula);
          this.setState({
             value: '',
             output: answer.toLocaleString(),
             evald: true
          });
      } catch (e) {
        this.setState({
          value: '',
          output: 'ERROR',
          formula: '',
          evald: true
       });
       setTimeout(this.reset, 2000)
      }
    }   
  }
  
  handleClear(e) {
    if (e.target.value === "AC") {
      this.reset();
    } else if(e.target.value === "CE") {
      
      this.setState({
        //value: '',
        formula: this.state.formula.replace(ceRegex, '').replace('±','')
      });
      console.log(this.state.formula)
    }
  }
  
  handleDecimal(e) {
    /*check if number alrerady has dec plc, add if not */
  }
  
  render() {
    return (
      <div className="calculator">
        <Display 
          formula={this.state.formula} 
          value={this.state.output} 
        />
        
        <Buttons 
          handleNum={this.handleNumbers}
          handleSign={this.handleSign}
          handleOp={this.handleOperator}
          handleEval={this.handleEval}
          handleClr={this.handleClear}
          handleDec={this.handleDecimal}/>
      </div>
    );
  }
}











