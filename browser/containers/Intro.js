import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router'

//import socket


//Intro Component
class Intro extends Component {
  render () {
    return (
      <div>
        <div id="title">Name: </div>
        <div className="form">
          <input value={name}></input>
          <Link to="/game">
            <button
              className="button"
              type="submit"
              onClick={()=>{}}
            >
              Play
            </button>
          </Link>

        </div>
      </div>
    )
  }
}

//Setting up Intro Container
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
