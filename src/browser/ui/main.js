import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PlexContainer from "plex-client/api/container";
import PlexDevice from "plex-client/api/device";

import Breadcrumbs from "./breadcrumbs";
import { DisplayContainer, DisplayDevice } from "./display";
import { selectItem, selectCrumb } from "../state/actions";

const Main = ({ breadcrumbs, current, onSelectItem, onSelectCrumb }) => {
  let mainElement = <div style={{ flex: "1" }}></div>;
  if (current instanceof PlexDevice) {
    mainElement = <DisplayDevice item={current} onSelectItem={onSelectItem}/>;
  } else if (current instanceof PlexContainer) {
    mainElement = <DisplayContainer item={current} onSelectItem={onSelectItem}/>;
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
        <Breadcrumbs crumbs={breadcrumbs} onSelectCrumb={onSelectCrumb}/>
      </div>
      {mainElement}
    </div>
  );
};

Main.propTypes = {
  breadcrumbs: PropTypes.array.isRequired,
  current: PropTypes.object,
  onSelectItem: PropTypes.func.isRequired,
  onSelectCrumb: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    breadcrumbs: state.get("breadcrumbs").toArray(),
    current: state.get("breadcrumbs").last(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectItem: (item) => {
      dispatch(selectItem(item));
    },
    onSelectCrumb: (index) => {
      dispatch(selectCrumb(index));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
