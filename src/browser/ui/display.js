import React from "react";
import PropTypes from "prop-types";

export const DisplayDevice = ({ device }) => {
  return (
    <div style={{
      flex: "1",
    }}>
      <ul>
        <li><b>ID:</b> {device.id}</li>
        <li><b>Name:</b> {device.name}</li>
        <li><b>Path:</b> {device.path}</li>
        <li><b>Art:</b> {device.art}</li>
        <li><b>Thumb:</b> {device.thumb}</li>
      </ul>
    </div>
  );
};

DisplayDevice.propTypes = {
  device: PropTypes.object.isRequired,
};
