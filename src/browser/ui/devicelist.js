import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Device from "./device";
import { setDevice } from "../state/actions";

const DeviceList = ({ devices, selectedDevice, onSelectDevice }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      width: "200px",
      borderRight: "1px solid grey",
    }}>
      {devices.map((device) => <Device key={device.id} device={device} selected={device === selectedDevice} onClick={() => onSelectDevice(device)}/>)}
    </div>
  );
};

DeviceList.propTypes = {
  devices: PropTypes.array.isRequired,
  selectedDevice: PropTypes.object.isRequired,
  onSelectDevice: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    devices: state.get("devices").toArray(),
    selectedDevice: state.get("selectedDevice"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectDevice: (device) => {
      dispatch(setDevice(device));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);
