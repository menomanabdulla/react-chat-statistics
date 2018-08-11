import React, { Component } from 'react';
import './App.css';


function ActiveFrndComp(props){
  return(
    <div>
         <h1>Active Friend</h1>
        <ul>
          {
            props.activeList.map((friend,key) =>(
              <li key={key}>
                <span>{friend.name}</span>
                <button onClick={()=>props.deactiveFriend(friend.name)}>Deactive</button>
                <button onClick={()=>props.removeFriend(friend.name)}>Remove</button>
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
            props.deactiveList.map((friend,key) =>(
              <li key={key}>
                <span>{friend.name}</span>
                <button onClick={()=>props.activeFriend(friend.name)}>Active</button>
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
      friends:[
       {
         name: 'Jordyn',
         active: true
       },
       {
         name: 'Mikanzi',
         active: true
       },
       {
         name: 'Jovi',
         active: false
       }
      ],
      inputValue: ''
    }
    this.inputHandeler = this.inputHandeler.bind(this)
    this.submitHandeler = this.submitHandeler.bind(this)
    this.removeHandler = this.removeHandler.bind(this)
    this.clearAllHandeler = this.clearAllHandeler.bind(this)
    this.toggleHandeler = this.toggleHandeler.bind(this)
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
      friends: this.state.friends.concat({
        name: this.state.inputValue,
        active: true
      }),
      inputValue: ''
    })
   // console.log(this.state.activeFrnd)
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

  toggleHandeler(name){
    this.setState(currentState => {
      const friend = currentState.friends.find((friend)=> friend.name === name)
      console.log(friend)
      console.log(currentState.friends.filter((friend)=> friend.name !== name))
      return{
        friends: currentState.friends.filter((friend)=> friend.name !== name)
          .concat({
            name,
            active: !friend.active
          })
      }
    })
  }

  removeHandler(name){
    this.setState({
      ...this.state,
      friends: this.state.friends.filter(item => item.name !== name )
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
              <ActiveFrndComp activeList = {this.state.friends.filter((friend)=> friend.active === true)}
                removeFriend = {this.removeHandler}
                deactiveFriend = {this.toggleHandeler}
              />
              <DeactiveFrndComp deactiveList = {this.state.friends.filter((friend)=> friend.active === false)}
                activeFriend = {this.toggleHandeler} />

          </div>
        </div> 
      </div>
    );
  }
}

export default App;
