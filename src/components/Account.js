import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { PasswordForgetForm } from "./PasswordForget";
import PasswordChangeForm from "./PasswordChange";
import withAuthorization from "./withAuthorization";

const AccountPage = ({ authUser, users }) => {

  let user = {};
  Object.keys(users).map(key => {
      if (users[key].id === authUser.uid) user =  users[key]
    });

  return (
    <div>
      <h1>Account: {authUser.email}</h1>
      <h3>
        Name: {user.username}, {user.lastname}
      </h3>
      <h3>role:{authUser.role}</h3>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  articles: state.articleState.articles,
  users: state.userState.users
});

const authCondition = authUser => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);
