import React, {Component} from 'react';
import {connect} from 'react-redux';
//import socket


//Lobby Component
class Lobby extends Component {
  render () {
    return (
      <div>
        <div id="title">Blatoon</div>
        <div className="form">
          <input value={name}></input>
          <button
            className="button"
            type="submit"
            onClick={play}
          >
            Play
          </button>
        </div>
      </div>
    )
  }
}

//Setting up Lobby Container
const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
