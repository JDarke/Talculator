import React from 'react';
import './index.css';
import Buttons from './Components/Buttons'
import Display from './Components/Display'

let ceRegex = new RegExp(/\d*\.?\d*$|(\d*\.?\d*[\+\*\/-])$/);  // add bracket functionality
//let opRegex = new RegExp(/[+\*\/-]$/);
let evalRegex = new RegExp(/[+*\/\-\.]+$/);
//let decRegex = new RegExp(/\./);
const signRegex = new RegExp(/(\(*\-\d*\.*\d*\)*)$/);

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
        maxChars: 17,
        outputSize: 3.2
    };
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleSign = this.handleSign.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEval = this.handleEval.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleMax = this.handleMax.bind(this);
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
  
  getFontSize(str) {
    switch(true) {
      case (str.length > this.state.maxChars):
        return 0;
        
      case (str.length === 9):
        return 3.1;
        
      case (str.length === 10):
        return 2.75;

      case (str.length === 11):
          return 2.5;  

      case (str.length === 12):
        return 2.35;
        
      case (str.length === 13):
        return 2.15;
        
      case (str.length === 14):
        return 2.05;
        
      case (str.length === 15):
        return 1.85;
        
      case (str.length === 16):
        return 1.70;
        
      case (str.length === 17):
        return 1.6;
        
      default:
        return 3.2;
    }
  }

  handleNumbers(e) {
    const {value, formula, last, sign, maxChars } = this.state;
    const newValue = e.target.value;
    console.log(this.state);
 
  if (last === 'eval') {
    this.setState({
      value: newValue,
      formula: newValue,
      last: 'num'
    })
  } else if ( !value.includes('MAX') ) {
      if (value.length === maxChars) {
        this.handleMax();
      } else if (last === 'sign' && sign === '-' ) {
        var val = value + newValue
        this.setState({
          value: val,
          formula: formula.replace(signRegex, val),
          prevValue: value,
          last: 'num',
          outputSize: this.getFontSize(val.toString())
        })
      } else if (value.length < maxChars ) {
        var val = last === 'op' ? newValue : value + newValue;
        this.setState({
          value: val,
          formula: formula + newValue,
          prevValue: value,
          last: 'num',
          outputSize: this.getFontSize(val.toString())
        })
      }
    }
    console.log(this.state);
  }
  
  handleSign(e) {
    const {value, formula, last, sign} = this.state;
    console.log(this.state);
    if (last === 'eval') {
    } else if (sign === '+' && last !== 'op') {
      this.setState({   
        value: '-' + value,
        formula: formula.slice(0, ((formula.length - 1) - value.toString().length + 1) ).concat('(-' + value + ')'),
        last: 'sign',
        sign: '-'
      })
    } else if (last !== 'op') {
      this.setState({   
        value: value.slice(1),
        formula: formula.replace(signRegex, value.slice(1)),
        last: 'sign',
        sign: '+'
      })
    }

  }

  handleDecimal(e) {
    const {value, formula, last} = this.state;
    
    if ( last !== 'dec' && !value.includes('.') ) {
      if (value === '' || last === 'op') {
        this.setState({
          value: '0.',
          formula: formula + '0.',
          last: 'dec'
        })
      } else {
        this.setState({
          value: value + '.',
          formula: formula + '.',
          last: 'dec'
        })
      }
    }
  }
  
  handleOperator(e) {
    const {value, formula, last} = this.state;
    const operator = e.target.value.replace('x', '*');
    console.log(this.state);

    if (last !== 'op' && value !== '' && value !== '-') {
      this.setState({
        value: operator,
        formula: formula.replace('=','') + operator,
        prevValue: value,
        last: 'op',
        sign: '+'
      })
    }
    console.log(this.state);
  }
  
  handleEval(e) {
    if (this.state.last !== 'eval') {
      let formula = this.state.formula;
      formula = formula.replace(evalRegex, '')
      try {
        let result = Math.round(1000000000000 * eval(formula)) / 1000000000000;
        this.setState({
          value: result,
          formula: formula + e.target.value,
          last: 'eval',
          outputSize: this.getFontSize(result.toString())
        })
      } catch (e) {
        this.setState({
          value: 'ERROR',
          formula: '',
          evald: true,
          last: 'eval'
      });
      setTimeout(this.reset, 2000)
      }
    }
  }
  
  handleClear(e) {
    if (e.target.value === 'AC') {
      this.reset();
    } else {
      this.setState({
        value: '',
        formula: this.state.formula.replace(ceRegex, '').replace('=', ''), 
        last: 'ce'
      })
    }
  }

  handleMax() {
    this.setState({
      value: 'MAX CHAR LIMIT',
      prevValue: this.state.value
    })
    setTimeout( () => this.setState({
      value: this.state.prevValue
    }), 1000)
  }
  
  render() {
    return ( 
      <>
        <div className="container">
          <div className="calculator">
          <h1 className="title">Talculator</h1>
            <Display 
              outputSize={this.state.outputSize}
              formula={this.state.formula} 
              value={this.state.value} 
            />
            <Buttons 
              handleNum={this.handleNumbers}
              handleSign={this.handleSign}
              handleOp={this.handleOperator}
              handleEval={this.handleEval}
              handleClr={this.handleClear}
              handleDec={this.handleDecimal}/>
            <div class="author"> <a href="https://johndarke.net">JohnDarke.net</a></div>
          </div>
        </div>
      </>
    );
  }
}











