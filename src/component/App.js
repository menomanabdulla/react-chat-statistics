import React, { Component } from 'react';
import './App.css';


window.API = {
  fetchFriends(){
    return new Promise ((res,rej)=>{
      const friends = [
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
       ]
       window.setTimeout(()=>res(friends),2000)
    })
  }
}


class Loading extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text : 'Loading'
    }
  }
  componentDidMount(){
    const stopper = this.state.text+'...'
   this.interval =  window.setInterval(()=>{
      this.state.text === stopper ?
      this.setState({text: 'Loading'}):
      this.setState((currentState)=>{
        return({
          text: currentState.text+'.'
        })
      })
    }
     ,300
    )
  }
  componentWillUnmount(){
    window.clearInterval(this.interval)
  }
  render(){
    return(
      <p>{this.state.text}</p>
    )
  }
}


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
      friends:[],
      inputValue: '',
      loading: true
    }
    this.inputHandeler = this.inputHandeler.bind(this)
    this.submitHandeler = this.submitHandeler.bind(this)
    this.removeHandler = this.removeHandler.bind(this)
    this.clearAllHandeler = this.clearAllHandeler.bind(this)
    this.toggleHandeler = this.toggleHandeler.bind(this)

    console.log('------ hello from constructor -------')
  }

  componentDidMount(){
    console.log('------- component-did-mount ----------')
    window.API.fetchFriends()
      .then((friends)=>{
        this.setState({
          ...this.state,
          friends,
          loading: false
        })
      })
    
  }
  componentDidUpdate(){
    console.log('------- component-will-unmount ----------')
  }
  componentWillUnmount(){
    console.log('------- component did update ----------')
  }
  shouldComponentUpdate(){
   // console.log('------- Should-Component-Update ----------')
   return true
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
  }

  toggleHandeler(name){
    this.setState(currentState => {
      const friend = currentState.friends.find((friend)=> friend.name === name)
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
      friends: []
    })
  }
  render() {
    if(this.state.loading){
      return(
        <Loading/>
      )
    }
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
              
              <DeactiveFrndComp deactiveList = {this.state.friends.filter((friend)=>friend.active === false)}
                              activeFriend = {this.toggleHandeler} />
          </div>
        </div> 
      </div>
    );
  }
}

export default App;
