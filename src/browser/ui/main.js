import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PlexContainer from "plex-client/api/container";
import PlexDevice from "plex-client/api/device";

import Breadcrumbs from "./breadcrumbs";
import JSONDisplay from "./json";
import { DisplayContainer, DisplayDevice } from "./display";
import { setUIValue, selectItem, selectCrumb } from "../state/actions";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: undefined };
  }

  componentDidCatch(error) {
    this.setState({ error: error });
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ overflow: "auto" }}>
          <pre>{String(this.state.error)}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};

const Main = ({ breadcrumbs, current, viewRaw, onSelectItem, onSelectCrumb, onViewRaw, onViewItem }) => {
  if (!current) {
    return <div style={{ flex: "1" }}></div>;
  }

  let mainElement = <div style={{ flex: "1" }}>Unknown item type.</div>;
  if (viewRaw) {
    mainElement = <JSONDisplay key={current.path} data={current._data}/>;
  } else if (current instanceof PlexDevice) {
    mainElement = <DisplayDevice key={current.path} item={current} onSelectItem={onSelectItem}/>;
  } else if (current instanceof PlexContainer) {
    mainElement = <DisplayContainer key={current.path} item={current} onSelectItem={onSelectItem}/>;
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
      <ErrorBoundary>
        {mainElement}
      </ErrorBoundary>
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
