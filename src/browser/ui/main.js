import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PlexContainer from "plex-client/api/container";
import PlexDevice from "plex-client/api/device";

import Breadcrumbs from "./breadcrumbs";
import JSONDisplay from "./json";
import { DisplayContainer, DisplayDevice } from "./display";
import { setUIValue, selectItem, selectCrumb } from "../state/actions";

const Main = ({ breadcrumbs, current, viewRaw, onSelectItem, onSelectCrumb, onViewRaw, onViewItem }) => {
  if (!current) {
    return <div style={{ flex: "1" }}></div>;
  }

  let mainElement = <div style={{ flex: "1" }}>Unknown item type.</div>;
  if (viewRaw) {
    mainElement = <JSONDisplay data={current._data}/>;
  } else if (current instanceof PlexDevice) {
    mainElement = <DisplayDevice item={current} onSelectItem={onSelectItem}/>;
  } else if (current instanceof PlexContainer) {
    mainElement = <DisplayContainer item={current} onSelectItem={onSelectItem}/>;
  }

  let toggleElement = <span style={{ cursor: "pointer" }} onClick={onViewRaw}>View Raw</span>;
  if (viewRaw) {
    toggleElement = <span style={{ cursor: "pointer" }} onClick={onViewItem}>View Item</span>;
  }

  return (
    <div style={{
      flex: "1",
      display: "grid",
      gridTemplateRows: "min-content auto",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "1px solid grey",
        padding: "10px",
      }}>
        <Breadcrumbs crumbs={breadcrumbs} onSelectCrumb={onSelectCrumb}/>
        {toggleElement}
      </div>
      {mainElement}
    </div>
  );
};

Main.propTypes = {
  breadcrumbs: PropTypes.array.isRequired,
  current: PropTypes.object,
  viewRaw: PropTypes.bool.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  onSelectCrumb: PropTypes.func.isRequired,
  onViewRaw: PropTypes.func.isRequired,
  onViewItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    breadcrumbs: state.get("breadcrumbs").toArray(),
    current: state.get("breadcrumbs").last(),
    viewRaw: state.getIn(["ui", "viewRaw"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectItem: (item) => {
      dispatch(selectItem(item));
    },
    onSelectCrumb: (index) => {
      dispatch(selectCrumb(index));
    },
    onViewRaw: () => {
      dispatch(setUIValue("viewRaw", true));
    },
    onViewItem: () => {
      dispatch(setUIValue("viewRaw", false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
