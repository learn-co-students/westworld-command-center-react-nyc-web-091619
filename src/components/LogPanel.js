import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'

const LogPanel = (props) => {

  // logs.unshift(Log.warn("This is an example of a warn log"))
  // logs.unshift(Log.notify("This is an example of a notify log"))
  // logs.unshift(Log.error("This is an example of an error log"))

  const getButtonValue = () =>{
    if(props.massAction === "activate" && props.coldHosts > 0){
      return "ACTIVATE ALL"
    }else{
      return "DECOMISSION ALL"
    }
  }

  const getButtonColor = () => {
    return getButtonValue() === "ACTIVATE ALL" ? "red" : "green"
  }

  return(
    <Segment className="HQComps" id="logPanel">
      <pre>
        {props.logs.map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
      </pre>
  
      <Button
        onClick={props.changeAllStatus}
        fluid
        content={getButtonValue()} 
        color={getButtonColor()} 
      />
    </Segment>
  )
}

export default LogPanel