import React from 'react';
import ReactDOM from 'react-dom';
import "./style.scss";
import Widget from './components/Widget/Widget';

const App = () => (
  <Widget />
);

ReactDOM.render(
  <App />,
  document.getElementById("root")
);