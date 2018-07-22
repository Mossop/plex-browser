import React from "react";
import PropTypes from "prop-types";

const JSONDisplay = ({ data }) => {
  return (
    <div style={{
      overflow: "auto",
    }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

JSONDisplay.propTypes = {
  data: PropTypes.object.isRequired,
};

export default JSONDisplay;
