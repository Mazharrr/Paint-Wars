import { connect } from 'react-redux';
import App from '../components/App';

// EI: these don't seem necessary...
const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
