import React from 'react';
import ReactDOM from 'react-dom';


export default class Buttons extends React.Component {

  render() {
    return (
      <div className="buttons">
        <button value="AC" className="clear" onClick={this.props.handleClr}>AC</button>
        <button value="CE" className="clear" onClick={this.props.handleClr}>CE</button>
        <button value="±" className="operator" onClick={this.props.handleOp}>±</button>
        <button value="/" className="operator" onClick={this.props.handleOp}>/</button>
        <button value="7" className="number" onClick={this.props.handleNum}>7</button>
        <button value="8" className="number" onClick={this.props.handleNum}>8</button>
        <button value="9" className="number" onClick={this.props.handleNum}>9</button>
        <button value="x" className="operator" onClick={this.props.handleOp}>x</button>
        <button value="4" className="number" onClick={this.props.handleNum}>4</button>
        <button value="5" className="number" onClick={this.props.handleNum}>5</button>
        <button value="6" className="number" onClick={this.props.handleNum}>6</button>
        <button value="-" className="operator" onClick={this.props.handleOp}>-</button>
        <button value="1" className="number" onClick={this.props.handleNum}>1</button>
        <button value="2" className="number" onClick={this.props.handleNum}>2</button>
        <button value="3" className="number" onClick={this.props.handleNum}>3</button>
        <button value="+" className="operator" onClick={this.props.handleOp}>+</button>
        <button value="0" className="number wide" onClick={this.props.handleNum}>0</button>
        <button value="." className="number" onClick={this.props.handleDec}>.</button>
        <button value="=" className="operator eval" onClick={this.props.handleEval}>=</button>

      </div>
    );
  }
}
