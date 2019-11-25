import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from "./HostInfo"

const Details = (props) => {

  const renderSomething = () => {
    if(!props.currentHost){
      return <Image size='medium' src={Images.westworldLogo}/>
    }else{
      return <HostInfo host={props.currentHost} options={props.options} removeAndReplace={props.removeAndReplace}/>  
    }
  }

  return(
    <Segment id="details" className="HQComps">
      {renderSomething()}
    </Segment>
  )
}

export default Details
