import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    render(props)
    this.state= {
      activeFrnd:[

      ],
      deactiveFrnd:[

      ],
      inputValue: ''
    }
  }
 
  inputHandeler(e){
    this.setState({
      ...this.state,
      inputValue: e.target.value
    })
  }

  submitHandeler(e){
    e.preventDefault();
    this.setState({
      ...this.state,
      activeFrnd: this.state.activeFrnd.concat(this.state.inputValue),
      inputValue: ''
    })
  }
  render() {
    return (
      <div className="App">
        <div className='add-block'>
          <form onSubmit={()=>this.submitHandeler()}>

            <input type="text" value={this.state.inputValue}  onChange={()=>this.inputHandeler()} />

          </form>
        </div> 
      </div>
    );
  }
}








export default App;
