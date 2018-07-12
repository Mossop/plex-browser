import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import DeviceList from "./devicelist";
import ClientPicker from "./clientpicker";
import LoginForm from "./loginform";
import Main from "./main";

const App = ({ client, account }) => {
  let results = [
    <div key="main" className="main" style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
      justifyContent: "start"
    }}>
      <DeviceList/>
      <Main/>
    </div>
  ];
  if (!client) {
    results.push((
      <div key="dialog" className="dialogFrame">
        <ClientPicker/>
      </div>
    ));
  } else if (!account) {
    results.push((
      <div key="dialog" className="dialogFrame">
        <LoginForm/>
      </div>
    ));
  }
  return results;
};

App.propTypes = {
  client: PropTypes.bool.isRequired,
  account: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    client: !!state.get("client"),
    account: !!state.get("account"),
  };
};

export default connect(mapStateToProps)(App);
