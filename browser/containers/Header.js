import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

const Header = function(props) {
  return <header />;
};

const mapStateToProps = state => ({
  Player: state.Player
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
