import React from "react";
import PropTypes from "prop-types";

const Device = ({ device, selected, onClick }) => {
  return (
    <div style={{
      textAlign: "center",
      padding: "10px",
      background: selected ? "blue" : "transparent",
      cursor: "pointer",
    }} onClick={onClick}>
      <div className="deviceImage"><img src="server.png" /></div>
      <p>{device.name}</p>
    </div>
  );
};

Device.propTypes = {
  device: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Device;
