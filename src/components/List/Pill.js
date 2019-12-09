import React from 'react';

export class Pill extends React.Component{

constructor(props){
  super(props);
  this.handleRemove=this.handleRemove.bind(this);
}


handleRemove(){
  this.props.onClick(this.props.selectedItems);
}


  render()
  {
    return(
      <p className="pillLi"><span className="ic-tokens">{this.props.selectedItems}</span>
      <span onClick={this.handleRemove}>x</span></p>
    );
  }
}
