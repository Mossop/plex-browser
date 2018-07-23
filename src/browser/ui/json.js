import React from "react";
import PropTypes from "prop-types";

const JSONDisplay = ({ data }) => {
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
};

JSONDisplay.propTypes = {
  data: PropTypes.object.isRequired,
};

export default JSONDisplay;
