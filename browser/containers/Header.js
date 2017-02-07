import React from 'react';
import {Link} from 'react-router'
import { connect } from 'react-redux';

const Header = function (props) {

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
        { props.Player &&
          <div className="col-xs-4">
              <h1>Name: {props.Player.name}</h1>
          </div>
        }

      </div>
      <div className="clear"></div>
    </header>
  );
}

const mapStateToProps = (state) => ({
Player: state.Player})

const mapDispatchToProps = (dispatch) => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);
