import React from 'react';
import { Link } from 'react-router';
import axios from 'axios'

export default function (props) {
  
  // console.log(props)

  return (
    <header>
      <h1 className="logo">Blatoon</h1>

      <div className="row">
        {/* <span style={{marginRight: 7}}>{user.toUpperCase()}</span> */}
        <div className="col-xs-4">
          <Link to='/lobby'>
            <h1>Lobby</h1>
          </Link> 
        </div>
        <div className="col-xs-4">
          <Link to='/lobby'>
            <h1>Github</h1>
          </Link> 
        </div>
        { props.player && 
          <div className="col-xs-4">
              <h1>{props.player.name}</h1>
          </div>
        }
        
      </div>
      <div className="clear"></div>
    </header>
  );
}