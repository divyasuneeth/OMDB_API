import React from 'react';
import {Search} from '../Search/Search'
import {List} from '../List/List'
import {OutsideAlert} from '../OutsideAlert/OutsideAlert'
import {Pill} from '../List/Pill'


export class App extends React.Component {

  constructor(props){
    super(props);

    this.state={
      suggestions:[],
      text:'',
      selecteditems:[],
      isVisible:true
    };

  this.handleOnChange=this.handleOnChange.bind(this);
  this.getMovies=this.getMovies.bind(this);
  this.suggestionSelected=this.suggestionSelected.bind(this);
  this.removeSelectedItem=this.removeSelectedItem.bind(this);
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
              if(!response)
              {
                throw ("No Response received");
                //return null;
              }
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

handleOnChange(e){
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

  if(suggestions.length===0)
  {
    return null;
  }

  return(
        <ul className="ToggleShow">
          {suggestions.map(item=><List onClick={this.suggestionSelected}
            value={item}/>)}
        </ul>
    );
}


suggestionSelected(value){

    let {selecteditems,isVisible}=this.state;

    if(selecteditems.length<5){
      selecteditems.push(value);
      isVisible=true;
    }

    if(selecteditems.length===5){
      isVisible=false;
    }

    this.setState({
      text:value,
      suggestions:[],
      selecteditems:selecteditems,
      isVisible:isVisible,
    });

    document.getElementById('search-text').value="";
}

renderPill(){
  const {selecteditems}=this.state;

  if(selecteditems.length===0)
    return null;

  return(
    selecteditems.map((item)=><Pill onClick={this.removeSelectedItem} selectedItems={item}/>)
  );
}

removeSelectedItem(e){
  let {selecteditems,isVisible}=this.state;
  selecteditems=selecteditems.filter(item=>item!==e);

  if(selecteditems.length===0)
  {
    isVisible=true;
  }

  this.setState({
    selecteditems:selecteditems,
    isVisible:isVisible
  });

}

 render() {
    return (

        <OutsideAlert>
            <div className="App">
                <div className="SearchBox">
                      {this.renderPill()}
                      <Search className={this.state.isVisible} onKeyDown={this.getMovies}
                           onChange={this.handleOnChange}  text={this.state.text} />
                </div>
                {this.renderSuggestion()}
            </div>
        </OutsideAlert>

    );
  }
}
