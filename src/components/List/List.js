import React from 'react'


export class List extends React.Component{
  constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick(e){
    this.props.onClick(this.props.value);
  }

  render(){
    return(
      <li className="suggestionlist" onClick={this.handleClick}>{this.props.value}</li>
    );
  }
}
