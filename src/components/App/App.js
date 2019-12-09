import React from 'react';
import {Search} from '../Search/Search'
import {ListPill} from '../ListPill/ListPill'
import {OutsideAlert} from '../OutsideAlert/OutsideAlert'


export class App extends React.Component {

  constructor(props){
    super(props);

    this.state={
      suggestions:[],
      text:'',
      selecteditems:[]
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
                let arr=response.Search.map(item=>item.Title);
                this.setState({
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

  if(text.length>0)
          {
            suggestions=suggestions.sort().filter(v =>v.includes(text));
          }
  this.setState({
    text:e.target.value,
    suggestions:suggestions
  });
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
    listitem.push(<ListPill onClick={this.suggestionSelected}
      value={suggestions[i]}/>)
  }

  return(
        <ul className="ToggleShow">
          {listitem}
        </ul>
    );
}


  suggestionSelected(value){

    let {selecteditems}=this.state;
    if(selecteditems.length<5){
      selecteditems.push(value);
    }
    if(selecteditems.length===5) {
      const element=document.getElementById('search-text');
      element.style.display="none";
    }

    this.setState({
      text:value,
      suggestions:[],
      selecteditems:selecteditems
    });

    // const pillElement=document.getElementsByClassName('hide');
    // const element=pillElement[0];
    // if(element)
    // {
    //   element.textContent=value;
    //   element.className = element.className.replace('hide','ic-tokens' );
    // }

    document.getElementById('search-text').value="";
}

renderPill(){
  const {selecteditems}=this.state;
  if(selecteditems.length===0)
    return null;

  return(
    selecteditems.map((item)=><p className="pillLi"><span className="ic-tokens">{item}</span>
    <span onClick={this.removeSelectedItem}>x</span></p>)
  );
}

removeSelectedItem(e){
console.log("inside the removeSelected");
  console.log(e);
}

  render() {

    return (
    <OutsideAlert>
        <div className="App">
            <div className="SearchBox">
                  {this.renderPill()}
                  <Search  onKeyDown={this.getMovies}
                       onChange={this.handelOnChange}  text={this.state.text} />
            </div>
            {this.renderSuggestion()}
        </div>
    </OutsideAlert>





    );
  }


}
