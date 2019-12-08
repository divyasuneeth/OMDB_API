import React from 'react';
import {Search} from '../Search/Search'
import {ListPill} from '../ListPill/ListPill'
import {OutsideAlert} from '../OutsideAlert/OutsideAlert'
import  './App.css'



export class App extends React.Component {

  constructor(props){
    super(props);

    this.state={
      items:[],
      suggestions:[],
      text:''
    };

  this.handelOnChange=this.handelOnChange.bind(this);
  this.getMovies=this.getMovies.bind(this);
  this.suggestionSelected=this.suggestionSelected.bind(this);

  }


  getMovies(e){
    let val= this.state.text;
    val += String.fromCharCode(e.keyCode).toLowerCase();
    const url =`http://www.omdbapi.com/?apikey=1a91d62a&s=${val}&y=&r=json`;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';


        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            const response=xhr.response;
            //console.log(xhr.response);
              if(response.Response && response.Response!=='False')
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
  const text= e.target.value;
  let {suggestions}=this.state;
  const {items}=this.state;

  if(text.length>0)
          {
            suggestions=items.sort().filter(v =>v.includes(text));
          }
  this.setState({
    text:e.target.value,
    suggestions:suggestions
  });

  console.log(this.state);
  }

renderSuggestion(){
  const {suggestions}=this.state;
  let listitem=[];

  if(suggestions.length===0)
  {
    return null;
  }

  for(let i=0;i<suggestions.length;i++)
  {
    listitem.push(<ListPill onClick={this.suggestionSelected} value={suggestions[i]}/>)
  }

  return(
        <ul className="ToggleShow">
          {listitem}
        </ul>
    );
  }


  suggestionSelected(value){
  console.log("selected Suggsestion"+ value);
  this.setState({
    text:value,
    suggestions:[]
  });
  }


  render() {
    return (

      <OutsideAlert>
       <div className="App">
           <Search  onKeyDown={this.getMovies}
          onChange={this.handelOnChange}  text={this.state.text} />
          {this.renderSuggestion()}
       </div>
    </OutsideAlert>





    );
  }


}
