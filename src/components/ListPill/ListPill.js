import React from 'react'
import './ListPill.css'

export class ListPill extends React.Component{
  constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick(e){
    this.props.onClick(this.props.value);
  }

  render(){
    return(
      <li onClick={this.handleClick}>{this.props.value}</li>
    );
  }
}
