import React from 'react';

export class Pill extends React.Component{

constructor(props){
  super(props);
  this.handelRemove=this.handelRemove.bind(this);
}


handelRemove(){
  this.props.onClick(this.props.selectedItems);
}


  render()
  {
    return(
      <p className="pillLi"><span className="ic-tokens">{this.props.selectedItems}</span>
      <span onClick={this.handelRemove}>x</span></p>
    );
  }
}
