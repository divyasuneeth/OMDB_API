import React from 'react'
import './Search.css'


export class Search extends React.Component{

  render(){

    return(

        <input className="SearchBox" value={this.props.text}  type="textarea" onChange={this.props.onChange}
        onKeyDown={this.props.onKeyDown} onClick={this.props.onClick}/>

    );
  }
}
