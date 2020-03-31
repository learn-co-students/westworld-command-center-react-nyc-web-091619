import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList';

const Area = (props) => {

  const slugify = (name) =>{
    let words = name.replace(/_/, " ").split(" ")
    return words.map(word => word[0].toUpperCase() + word.slice(1)).join("")
  }

  return (
    <div className='area' id={props.name}>
      <h3 className='labels'>{slugify(props.name)}</h3>
      <HostList hosts={props.hosts} swapHost={props.swapHost} currentHost={props.currentHost}/>
    </div>
  )
}

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;