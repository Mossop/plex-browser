import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createClient, setUIValue } from "../state/actions";

const ClientPicker = ({ type, onChangeType, onAcceptClick }) => {
  return (
    <div className="dialog" style={{
      gridTemplateColumns: "auto auto",
    }}>
      <label htmlFor="clientType">Type:</label>
      <select id="clientType" value={type} onChange={(e) => onChangeType(e.target.value)}>
        <option value="default">Default</option>
        <option value="web">Web Browser</option>
        <option value="android">Android</option>
      </select>
      <div style={{
        gridColumnEnd: "span 2",
        textAlign: "end",
      }}>
        <button type="button" onClick={() => onAcceptClick(type)}>Accept</button>
      </div>
    </div>
  );
};

ClientPicker.propTypes = {
  type: PropTypes.string.isRequired,
  onChangeType: PropTypes.func.isRequired,
  onAcceptClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    type: state.getIn(["ui", "clientType"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeType: (type) => {
      dispatch(setUIValue("clientType", type));
    },
    onAcceptClick: (type) => {
      dispatch(createClient(type));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientPicker);
