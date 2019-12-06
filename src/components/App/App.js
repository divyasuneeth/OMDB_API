import React from 'react';
import {Search} from '../Search/Search'

export class App extends React.Component {

  constructor(props){
    super(props);
    //this.items=['Dog','Cat','Deer','Cape','Mouse','Mitten'];

    this.state={
      items:[],
      suggestions:[],
      text:''
    };

  this.handelOnChange=this.handelOnChange.bind(this);
  this.getMovies=this.getMovies.bind(this);


  }


  getMovies(e){

    let val= this.state.text;
     val += String.fromCharCode(e.keyCode).toLowerCase();

    console.log(val);
    const url =`http://www.omdbapi.com/?apikey=1a91d62a&s=${val}&y=&r=json`;

console.log(url);
      const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';


        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            const response=xhr.response;
            //console.log(xhr.response);
              if(response.Response!=='False')
              {
                console.log(response.Search.map(item=>item.Title));
                let arr=response.Search.map(item=>item.Title);
                this.setState({
                  items:arr,
                  suggestions:arr
                });


              }
          }
        }

        xhr.open('GET', url);
        xhr.send();


      }

  handelOnChange(e){

   const text=e.target.value;


    let {suggestions}=this.state;

    //console.log(val);
    console.log(`Text ${text}`);
    console.log(`Suggestions ${suggestions}`);

    let {items}=this.state;
    if(!items)
      items=[''];

    console.log(items);

        if(text.length>0)
          {
            suggestions=items.sort().filter(v =>v.includes(text));
          }
          this.setState(()=>({suggestions,text}));



  }




  renderSuggestion(){
  const {suggestions}=this.state;
  if(suggestions.length===0)
  {
    return null;
  }
    return (
      <div id="divBox" className="BoxShadow">
      <ul>
        {suggestions.map(item=>
          <li  onClick={()=>this.suggestionSelected(item)}>{item}</li>)}
      </ul>
      </div>
    );
  }

  suggestionSelected(value){
  this.setState(()=>({
    text:value,
    suggestions:[],
  }))
  }




  render() {

    return (
      <form>
      <div className="SearchDiv">
      <Search items={this.state.items} onKeyDown={this.getMovies} onChange={this.handelOnChange} text={this.state.text} />
        {this.renderSuggestion()}
        </div>
        </form>
    );
  }


}
