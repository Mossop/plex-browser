import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login, setUIValue } from "../state/actions";

const LoginForm = ({ client, username, password, loginFailed, onChangeUsername, onChangePassword, onLoginClick }) => {
  let warning = <span></span>;
  if (loginFailed) {
    warning = <span className="warning">Login failed!</span>;
  }

  return <div className="dialog" style={{
    gridTemplateColumns: "auto auto",
  }}>
    <label htmlFor="username">Username:</label>
    <input type="text" id="username" value={username} onChange={(e) => onChangeUsername(e.target.value)}/>
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" value={password} onChange={(e) => onChangePassword(e.target.value)}/>
    {warning}
    <div style={{
      textAlign: "end",
    }}>
      <button type="button" onClick={() => onLoginClick(client, username, password)}>Login</button>
    </div>
  </div>;
};

LoginForm.propTypes = {
  client: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loginFailed: PropTypes.bool.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    username: state.getIn(["ui", "username"]),
    password: state.getIn(["ui", "password"]),
    loginFailed: state.getIn(["ui", "loginFailed"]),
    client: state.get("client"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeUsername: (text) => {
      dispatch(setUIValue("loginFailed", false));
      dispatch(setUIValue("username", text));
    },
    onChangePassword: (text) => {
      dispatch(setUIValue("loginFailed", false));
      dispatch(setUIValue("password", text));
    },
    onLoginClick: (client, username, password) => {
      dispatch(login(client, username, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
