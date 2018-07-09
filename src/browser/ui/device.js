import React from "react";
import PropTypes from "prop-types";

const Device = ({ device }) => {
  return (
    <div style={{
      textAlign: "center",
      padding: "10px",
    }}>
      <div className="deviceImage"><img src="server.jpg" /></div>
      <p>{device.name}</p>
    </div>
  );
};

Device.propTypes = {
  device: PropTypes.object.isRequired,
};

export default Device;
