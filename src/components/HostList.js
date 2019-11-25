import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

const HostList = (props) => {

  const renderHosts = function(){
    return props.hosts.map(host => {
      return <Host currentHost={props.currentHost} swapHost={props.swapHost} key={host.id} host={host}/>
    })
  }

  return(
    <Card.Group itemsPerRow={6}>
      {renderHosts()}
    </Card.Group>
  )
}

export default HostList
