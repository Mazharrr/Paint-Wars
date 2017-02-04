import React, {Component} from 'react';
import {connect} from 'react-redux';
//import socket


//Intro Component
class Intro extends Component {
  render () {
    return (
      <div>
        <div id="title">Name: </div>
        <div className="form">
          <input value={name}></input>
          <button
            className="button"
            type="submit"
            onClick={()=>{}}
          >
            Play
          </button>
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
