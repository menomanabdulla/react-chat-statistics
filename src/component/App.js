import React, { Component } from 'react';
import './App.css';


function ActiveFrndComp(props){
  return(
    <div>
         <h1>Active Friend</h1>
        <ul>
          {
            props.activeList.map((name,key) =>(
              <li key={key}>
                <span>{name}</span>
                <button onClick={()=>props.deactiveFriend(name)}>Deactive</button>
                <button onClick={()=>props.removeFriend(name)}>Remove</button>
              </li>
            ))
          }
        </ul>
    </div>
  )
}

function DeactiveFrndComp(props){
  return(
    <div>
         <h1>Deactive Friend</h1>
        <ul>
          {
            props.deactiveList.map((name,key) =>(
              <li key={key}>
                <span>{name}</span>
                <button onClick={()=>props.activeFriend(name)}>Active</button>
              </li>
            ))
          }
        </ul>
    </div>
  )
}

class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      activeFrnd:[
        'noman','abdulla'
      ],
      deactiveFrnd:[

      ],
      inputValue: ''
    }
    this.inputHandeler = this.inputHandeler.bind(this)
    this.submitHandeler = this.submitHandeler.bind(this)
    this.removeHandler = this.removeHandler.bind(this)
    this.deactiveHandeler = this.deactiveHandeler.bind(this)
    this.activeHandeler = this.activeHandeler.bind(this)
    this.clearAllHandeler = this.clearAllHandeler.bind(this)
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
      activeFrnd: this.state.activeFrnd.concat([this.state.inputValue]),
      inputValue: ''
    })
    console.log(this.state.activeFrnd)
  }
 
  deactiveHandeler(name){
    this.setState({
      ...this.state,
      activeFrnd: this.state.activeFrnd.filter(item => item !== name ),
      deactiveFrnd: this.state.deactiveFrnd.concat([name])
    })
  }

  activeHandeler(name){
    this.setState({
      ...this.state,
      activeFrnd: this.state.activeFrnd.concat([name]),
      deactiveFrnd:  this.state.deactiveFrnd.filter(item => item !== name )
     
    })
  }
  removeHandler(name){
    this.setState({
      ...this.state,
      activeFrnd: this.state.activeFrnd.filter(item => item !== name )
    })
  }
  clearAllHandeler(){
    this.setState({
      ...this.state,
      activeFrnd: [],
      deactiveFrnd: []
    })
  }
  render() {
    return (
      <div className="App">
        <div className='add-block'>
          <form onSubmit={this.submitHandeler}>
            <input type="text" value={this.state.inputValue}  onChange={this.inputHandeler} />
            <button type="submit" className="btn tbn-default">Add Friend</button>
          </form>
          <button onClick={this.clearAllHandeler}>ClearAll</button>
          <div>
              <ActiveFrndComp activeList = {this.state.activeFrnd}
                removeFriend = {this.removeHandler}
                deactiveFriend = {this.deactiveHandeler}
              />
              <DeactiveFrndComp deactiveList = {this.state.deactiveFrnd}
                activeFriend = {this.activeHandeler} />
          </div>
        </div> 
      </div>
    );
  }
}








export default App;
