import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router'
import {addPlayerName} from '../reducers/player'

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
      <div>
        <form>
          <legend>Name </legend>
          <input type="text" value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})} />
          <Link to="/lobby">
          <button
            className="button"
            type="submit"
            onClick={()=>{this.props.addPlayerName(this.state.name)}}
            >
              Play
            </button>
          </Link>
        </form>



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
