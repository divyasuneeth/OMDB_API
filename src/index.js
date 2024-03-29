import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './components/App/App';
import * as serviceWorker from './serviceWorker';
import {ErrorBoundary} from './ErrorBoundary';

class Index extends React.Component{
  render(){
    return(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>

    );
  }
}



ReactDOM.render(<Index/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
