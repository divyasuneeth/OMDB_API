Import React from 'react'

export class ListPill extends React.Component{
  render(){
    return(
      <li onClick={this.props.onClick}>{this.props.item}</li>

    );
  }
}
