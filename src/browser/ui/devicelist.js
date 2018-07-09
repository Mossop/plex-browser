import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Device from "./device";

const DeviceList = ({ devices }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      background: "blue",
      width: "200px",
    }}>
      {devices.map((device) => <Device key={device.id} device={device}/>)}
    </div>
  );
};

DeviceList.propTypes = {
  devices: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    devices: state.get("devices").toArray(),
  };
};

export default connect(mapStateToProps)(DeviceList);
