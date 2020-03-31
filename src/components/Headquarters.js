import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage';
import LogPanel from './LogPanel';


class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.

  options = [
    {key: "high_plains", text: "High Plains", value: "high_plains"},
    {key: "lowlands", text: "Lowlands", value: "lowlands"},
    {key: "python_pass", text: "Python Pass", value: "python_pass"},
    {key: "badlands", text: "Badlands", value: "badlands"},
    {key: "pariah", text: "Pariah", value: "pariah"},
    {key: "under_construction", text: "Under Construction", value: "under_construction"}
  ]

  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage swapHost={this.props.swapHost} currentHost={this.props.currentHost} hosts={this.props.hosts}/>
        </Grid.Column>

        <Grid.Column width={5}>
          <Details currentHost={this.props.currentHost} options={this.options} removeAndReplace={this.props.removeAndReplace}/>
        </Grid.Column>

        <Grid.Column width={3}>
          <LogPanel logs={this.props.logs} numHosts={this.props.numHosts} coldHosts={this.props.hosts.length} changeAllStatus={this.props.changeAllStatus} massAction={this.props.massAction}/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;