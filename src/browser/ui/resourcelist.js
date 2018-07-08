import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ResourceList = ({ resources }) => {
  return <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    background: "blue",
    width: "200px",
  }}>
  </div>;
};

ResourceList.propTypes = {
  resources: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  return {
    resources: state.get("resources").toArray(),
  };
};

export default connect(mapStateToProps)(ResourceList);
