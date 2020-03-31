import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area';
//import { realpathSync } from 'fs';


const WestworldMap =(props) =>{


  const renderAreas =()=>{
    return props.areas.map(area =>{
      let theseHosts = props.hosts.filter(host => host.area === area.name)
    
      return <Area swapHost={props.swapHost} currentHost={props.currentHost} key={area.id} {...area} hosts={theseHosts}/>
    })
  }

 
  return (
    <Segment id="map" >
      {renderAreas()}
    </Segment>
  )
  
  
}

export default WestworldMap