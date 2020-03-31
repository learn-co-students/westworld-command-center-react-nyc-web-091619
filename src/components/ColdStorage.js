import React from 'react';
import { Segment } from 'semantic-ui-react'
//import { prependOnceListener } from 'cluster';
import HostList from "./HostList"

const ColdStorage = (props) => {

  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        <HostList hosts={props.hosts} swapHost={props.swapHost} currentHost={props.currentHost}/>
      </Segment>
    </Segment.Group>
  )
}

export default ColdStorage