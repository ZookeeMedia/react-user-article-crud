import React from 'react';
import { connect } from 'react-redux';

import { firebase, auth } from '../firebase';


const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {

    componentDidMount() {
      const { onSetAuthUser } = this.props;
      firebase.auth.onAuthStateChanged(authUser => {

        // find the users role and insert it into the state from here
        if (authUser) {
          auth.getCurrentUser().then(res => {
            let user = res;
            if (!!user && ('admin' in user)) authUser.role = 'ADMIN';
            authUser
              ? onSetAuthUser(authUser)
              : onSetAuthUser(null);
          });
        }

      });
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;