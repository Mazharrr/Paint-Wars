import React, { Component } from 'react';
import ReactDom from 'react-dom'

import Header from '../containers/Header';
//import SidebarContainer from '../containers/SidebarContainer';

export default function (props) {
  return (
    <div id="main" className="container-fluid">
      	<div className="row">
          <div className="col-xs-12">
          	<Header />
              {
                props.children && React.cloneElement(props.children, props)
              }
          </div>
        </div>
    </div>
  );
}
