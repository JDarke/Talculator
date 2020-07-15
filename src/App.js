import React from 'react';
import './index.css';
import Buttons from './Components/Buttons';
import Display from './Components/Display';

const ceRegex = new RegExp(/\d*\.?\d*$|(\d*\.?\d*[\+\*\/-])$|\(\S*\)$/),  
      evalRegex = new RegExp(/[+*\/\-\.]+$/),
      signRegex = new RegExp(/(\(*\-\d*\.*\d*\)*)$/),
      warn = 'MAX CHAR LIMIT',
      err = 'ERROR';

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
        last: 'AC',
        output: '',
        evald: false
    });
  }
  
  
  getFontSize(str) {
    switch(true) {
      case (str.length > this.state.maxChars):
        return 1.55;
        
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
        return 1.9;
        
      case (str.length === 16):
        return 1.7;
        
      case (str.length === 17):
        return 1.6;
        
      default:
        return 3.2;
    }
  }

  handleNumbers(e) {
    const { value, formula, last, sign, maxChars } = this.state;
    const newValue = e.target.value;

    if (last === 'eval') {
      this.setState({
        value: newValue,
        formula: newValue,
        output: newValue,
        last: 'num'
      });
    } else if ( !value.includes('MAX') ) {
        var val;
        if (value.length === maxChars) {
          this.handleMax();
        } else if (last === 'sign' && sign === '-' ) {
          val = value + newValue
          this.setState({
            value: val,
            output: parseFloat(val).toLocaleString(),
            formula: formula.replace(signRegex, val),
            prevValue: value,
            last: 'num',
            outputSize: this.getFontSize(val.toString())
          });
        } else if (value.length < maxChars ) {
          val = last === 'op' ? newValue : value + newValue;
          this.setState({
            value: val,
            output: parseFloat(val).toLocaleString(),
            formula: formula + newValue,
            prevValue: value,
            last: 'num',
            outputSize: this.getFontSize(val.toString())
          });
        }
      }
  }
  
  handleSign(e) {
    const { value, formula, last, sign } = this.state;

    if (last !== 'eval' && last !== 'op') {
      if (sign === '+') {
        this.setState({   
          value: '-' + value,
          output: value !== '' 
                  ? '-' + parseFloat(value).toLocaleString() 
                  : '-',
          formula: formula.slice(0, (formula.length - value.toString().length) ).concat('(-' + value + ')'),
          last: 'sign',
          sign: '-'
        });
      } else {
        let newValue = value.slice(1);
        this.setState({   
          value: newValue,
          output: parseFloat(newValue).toLocaleString(),
          formula: formula.replace(signRegex, newValue),
          last: 'sign',
          sign: '+'
        });
      }
    }
  }

  handleDecimal(e) {
    const { value, formula, last } = this.state;
    
    if ( last !== 'dec' && !value.includes('.') ) {
      if (value === '' || last === 'op') {
        this.setState({
          value: '0.',
          output: '0.',
          formula: formula + '0.',
          last: 'dec'
        });
      } else {
        this.setState({
          value: value + '.',
          output: parseFloat(value).toLocaleString() + '.',
          formula: formula + '.',
          last: 'dec'
        });
      }
    }
  }
  
  handleOperator(e) {
    const { value, formula, last } = this.state;
    const operator = e.target.value.replace('x', '*');
    
    if (last !== 'op' && value !== '' && value !== '-') {
      this.setState({
        value: operator,
        output: operator,
        formula: formula.replace('=','') + operator,
        prevValue: value,
        last: 'op',
        sign: '+'
      });
    }
  }
  
  handleEval(e) {
    let { formula, maxChars, last } = this.state;

    if (last !== 'eval') {
      formula = formula.replace(evalRegex, '');
      try {
        const result = Math.round(100000000000 * eval(formula)) / 100000000000,
              output = result.toString().length > maxChars
                    ? parseFloat(result).toExponential(2)
                    : parseFloat(result).toLocaleString(),
              fontSize = this.getFontSize(result.toString());  // need to rescan if exponent, use if to replace ternary, or use auto-scaling text idea
        this.setState({
          value: result,
          output: output,
          formula: formula + e.target.value,
          last: 'eval',
          outputSize: fontSize
        });
      } catch (e) {
        this.setState({
          value: err,
          output: err,
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
      const newFormula = this.state.formula.replace(ceRegex, '').replace('=', '');  // refactor into a sep let
      this.setState({
        value: '',
        output: '',
        formula: newFormula, 
        last: 'ce'
      })
    }
  }

  handleMax() {
    const { prevValue, value } = this.state;
    this.setState({
      value: warn,
      output: warn,
      prevValue: value
    })
    setTimeout( () => this.setState({
      value: prevValue,
      output: parseFloat(prevValue).toLocaleString(),
    }), 1000)
  }
  
  render() {
    return ( 
      <div className="container">
        <div className="calculator">
        <h1 className="title">Talculator</h1>
          <Display 
            outputSize={this.state.outputSize}
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
          <div className="author"> <a href="https://johndarke.net">JohnDarke.net</a></div>
        </div>
      </div>
    );
  }
}











