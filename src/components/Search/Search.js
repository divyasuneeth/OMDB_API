import React from 'react'



export class Search extends React.Component{

  render(){
    const text=this.props.text;
    return(
       <div className="SearchBox" >
       <p className="ic-tokens"></p>
        <input id="search-text" className="SearchEdit"   type="textarea" onChange={this.props.onChange}
        onKeyDown={this.props.onKeyDown} onClick={this.props.onClick}/>
        </div>

    );
  }
}
