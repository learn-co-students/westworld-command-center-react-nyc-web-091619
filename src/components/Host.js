import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {

  const handleClick = function(){
    props.swapHost(props.host)
  }

  const isThisSelected = function(){
    return props.currentHost && props.currentHost.id === props.host.id
  }

  return(
    <Card
      className={isThisSelected()? "host selected" : "host"} 
      onClick={handleClick}
      image={props.host.imageUrl}
      raised
    />
  )
}

export default Host
