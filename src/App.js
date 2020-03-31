import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap';
import Headquarters from './components/Headquarters';
import { Log } from './services/Log'

class App extends Component {

  state = {
    areas: [],
    allHosts: [],
    activeHosts: [],
    coldHosts: [],
    currentHost: null,
    logs: [],
    massAction: "activate"
  }

  checkAreaRoom = (area) =>{
    let areaObj = this.state.areas.find(a => a.name === area)
    let hostsInHere = this.state.activeHosts.filter(host=> host.area === areaObj.name)
    return (hostsInHere.length + 1 <= areaObj.limit)
  }

  createLog(msg){
    let newLogs = this.state.logs
    switch (msg.split(" ")[0]){
      case "Moved":
        newLogs.unshift(Log.notify(msg))
        break;
      case "Too":
        newLogs.unshift(Log.error(msg))
        break;
      case "Activated":
        newLogs.unshift(Log.warn(msg))
        break;
      case "Decomissioned":
        newLogs.unshift(Log.notify(msg))
        break;
      case "Decomissioning":
        newLogs.unshift(Log.notify(msg))
        break;
      case "Activating":
        newLogs.unshift(Log.warn(msg))
        break;
      default:
        break;
    } 
    this.setState({
      logs: newLogs
    })
  }

  removeAndReplace = (newHost, logMsg) => {
    if(this.checkAreaRoom(newHost.area)){
      let newHosts = this.state.allHosts.filter(host => host.id !== newHost.id)
      newHosts.push(newHost)

      this.createLog(logMsg)
    
      this.setState({
        allHosts: [...newHosts],
        activeHosts: newHosts.filter(host => host.active),
        coldHosts: newHosts.filter(host => !host.active),
        currentHost: newHost
      })

    }else{
      console.log('ya cant do that')
      this.createLog(`Too many hosts - cannot add ${newHost.name} to ${newHost.area}`)
    }
    
  }

  swapHost = (host) =>{
    this.setState({
      currentHost: host
    })
  }

  changeAllStatus = () =>{
    let newHosts = [...this.state.allHosts]
    let newCurrentHost
    let action = this.state.massAction === "activate" ? true : false

    if(this.state.currentHost){
      newCurrentHost = {...this.state.currentHost}
      newCurrentHost.active = action
    }else{
      newCurrentHost = null
    }
    newHosts.forEach(host => host.active = action)

    this.createLog(action? "Activating all hosts" : "Decomissioning all hosts")

    this.setState({
      allHosts: [...newHosts],
      activeHosts: newHosts.filter(host => host.active),
      coldHosts: newHosts.filter(host => !host.active),
      currentHost: newCurrentHost,
      massAction: action ? "decomission" : "activate" 
    })
  }

  componentDidMount(){
    fetch("http://localhost:4000/hosts")
    .then(resp => resp.json())
    .then(data => {
      console.log("\n\nHOSTS...setting host data after mount\n\n")
      this.setState({
        allHosts: data,
        coldHosts: data
      })
    })

    fetch("http://localhost:4000/areas")
    .then(resp => resp.json())
    .then(data => {
      console.log("\n\nAREAS...setting area data after WWMap mount\n\n")
      this.setState({
        areas: data
      })
    })
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap swapHost={this.swapHost} currentHost={this.state.currentHost} hosts={this.state.activeHosts} areas={this.state.areas}/>
        <Headquarters swapHost={this.swapHost} currentHost={this.state.currentHost} hosts={this.state.coldHosts} removeAndReplace={this.removeAndReplace} numHosts={this.state.allHosts.length} logs={this.state.logs} changeAllStatus={this.changeAllStatus} massAction={this.state.massAction}/>
      </Segment>
    )
  }
}

export default App;