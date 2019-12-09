import React from 'react'

export class Search extends React.Component{

  render(){
    console.log(this.props.isVisible);
    return(

        <input id="search-text" className={this.props.className?'SearchEdit':'hide'} type="textarea" onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown} onClick={this.props.onClick}/>

    );
  }
}
