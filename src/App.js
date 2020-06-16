import React from 'react';
import './index.css';
import Buttons from './Components/Buttons'
import Display from './Components/Display'

let ceRegex = new RegExp(/\d+$|(\d+[\+x\/-])$/);
let opRegex = new RegExp(/[+x\/-]$/);
let evalRegex = new RegExp(/[+*\/-]+$/);
let decRegex = new RegExp(/\./);

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
      var value = this.state.value;
      var output;
    
      if (!this.state.evald) {
        if (value.length < this.state.maxChars) {
          value += e.target.value;
          output = parseFloat(value);
          var size = this.getFontSize(value.toLocaleString());

          this.setState({
            value: value,
            output: output.toLocaleString(),
            outputSize: size
          });
          if (size === '0') {
            this.setState({
              prevValue: '0',
              formula: '',
              sign: '+',
              last: '',
              output: '',
              evald: false,
              outputSize: 3.2
            });
          }
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
    var value = this.state.output;
    if (value[0] === '-') {
      this.setState({
        value: value.substr(1),
        output: value.substr(1).toLocaleString()
      })
    } else {
      this.setState({
        value: '-' + value,
        output: '-' + value.toLocaleString(),
      })
    }
  }

  handleDecimal(e) {
    var value = this.state.value;
    var output = this.state.output; 
      if (!this.state.evald) {
        if (!this.state.value.match(decRegex) && value.length < this.state.maxChars) {
          value += e.target.value;
          output = parseFloat(value);
          var size = this.getFontSize(value.toLocaleString());
          this.setState({
            value: value,
            output: output.toLocaleString() + '.',
            outputSize: size
          });
          if (size === '0') {
            this.setState({
              prevValue: '0',
              formula: '',
              sign: '+',
              last: '',
              output: '',
              evald: false,
              outputSize: 3.2
            });
          }
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
  
  handleOperator(e) {
    var value = this.state.value 
    var formula = this.state.formula
    if (!formula.match(opRegex) || value !== '') {
      value += e.target.value;
    }
      
    if (!this.state.evald) {
      this.setState({
        prevValue: value,
        value: '',
        output: '',
        formula: formula + value.replace('±','')
      });
    } else {
        this.setState({
          prevValue: '',
          value: '',
          formula: formula + e.target.value.replace(',','').replace('±',''),
          evald: false
        });
    }
  }
  
  handleEval(e) {
    var value = this.state.value;
    var formula = this.state.formula;
    
    if (!this.state.evald) {
      if (this.state.value !== '') {
        this.setState({
           //value: '',
           formula: formula += value
        });
      
        formula = formula.replace('x', '*');
        formula = formula.replace(evalRegex, '');
        
        try {
          var answer = Math.round(100000000 * eval(formula)) / 100000000;
        
            this.setState({
              value: answer,
              output: answer.toLocaleString(),
              evald: true,
              outputSize: this.getFontSize(answer.toString())    
            
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
  }
  
  handleClear(e) {
    if (e.target.value === "AC") {
      this.reset();
    } else if(e.target.value === "CE") {
      this.setState({
        formula: this.state.formula.replace(ceRegex, '').replace('±','')
      });
      console.log(this.state.formula)
    }
  }
  
  render() {
    return ( 
      <>
        <div class="container">
          <h1 class="title">Talculator 1.0</h1>
          <div className="calculator">
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
          </div>
           <div class="author">by <a href="https://johndarke.net/home.php">John Darke</a></div>
        </div>
      </>
    );
  }
}











