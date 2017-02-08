import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link, hashHistory } from 'react-router'
import {addPlayerName} from '../reducers/player'
import Header from '../containers/Header';

//import socket


//Intro Component
class Intro extends Component {
  constructor(props){
    super(props)
    this.state = {
        name: ''
    }
  }
  render () {
    return (
      <div className="container paintBackground">
        <img src="/assets/paintWarsLogo.png" id="gameLogo"></img>
        <div className="row">
          <div className="rpgui-content container">
            <form className="rpgui-container framed customForm">
              <h1>What's your name?</h1>
              <input type="text" value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})} />
                <button
                  className="button"
                  type="submit"
                  onClick={(e)=>{
                    e.preventDefault()
                    console.log(this.props.addPlayerName)
                    return this.props.addPlayerName(this.state.name)
                    .then(()=>hashHistory.push('/lobby'))}
                  }
                  >
                  Play
                </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

//Setting up Intro Container
const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    addPlayerName:  (name) => dispatch(addPlayerName(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
