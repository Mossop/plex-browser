import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PlexDevice from "plex-client/api/device";

import Breadcrumbs from "./breadcrumbs";
import { DisplayDevice } from "./display";

const Main = ({ breadcrumbs, current }) => {
  let mainElement = <div style={{ flex: "1" }}></div>;
  if (current instanceof PlexDevice) {
    mainElement = <DisplayDevice device={current}/>;
  }

  return (
    <div style={{
      flex: "1",
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderBottom: "1px solid grey",
      }}>
        <Breadcrumbs crumbs={breadcrumbs}/>
      </div>
      {mainElement}
    </div>
  );
};

Main.propTypes = {
  breadcrumbs: PropTypes.array.isRequired,
  current: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    breadcrumbs: state.get("breadcrumbs").toArray(),
    current: state.get("breadcrumbs").last(),
  };
};

export default connect(mapStateToProps)(Main);
