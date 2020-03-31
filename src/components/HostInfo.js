import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {
  
  handleChange = (e, {value}) => {
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
    
    let newHost = {...this.props.host}
    newHost.area = value
    this.props.removeAndReplace(newHost, `Moved ${newHost.firstName} to ${value}`)
  }

  toggle = () => {
    let newHost = {...this.props.host}
    console.log("newhost =", newHost)
    newHost.active = !newHost.active
    this.props.removeAndReplace(newHost, newHost.active ? `Activated ${newHost.firstName}` : `Decomissioned ${newHost.firstName}` )
  }

  render(){
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={this.props.host.imageUrl} // pass in the right image here 
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {this.props.host.firstName} | { this.props.host.gender === "male" ? <Icon name='man' /> : <Icon name='woman' />} 
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={this.props.host.active? "Active" : "Decomissioned"} 
                  checked={this.props.host.active} 
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.props.host.area}
                options={this.props.options}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo