import React from "react";
import PropTypes from "prop-types";

import PlexContainer from "plex-client/api/container";
import PlexDevice from "plex-client/api/device";
import { PlexEpisode } from "plex-client/api/metadata";

class DisplayItem extends React.Component {
  getDisplayFields() {
    let { item } = this.props;

    return [
      <li key="name"><b>Name:</b> {item.name}</li>,
      <li key="path"><b>Path:</b> {item.path}</li>,
      <li key="art"><b>Art:</b> {String(item.art)}</li>,
      <li key="thumb"><b>Thumb:</b> {String(item.thumb)}</li>,
    ];
  }

  renderItems() {
    return <div></div>;
  }

  render() {
    let { item } = this.props;
    let fields = this.getDisplayFields();
    let styles = {};

    if (item.art) {
      styles.backgroundImage = `url(${item.device.transcodeImage(item.art, {
        background: "ffffff",
        opacity: 30,
        format: "png",
        width: 1024,
        height: 1020,
      })})`;
      styles.backgroundPosition = "top center";
      styles.backgroundRepeat = "no-repeat";
      styles.backgroundSize = "contain";
    }

    return (
      <div style={styles}>
        <ul>
          {fields}
        </ul>
        {this.renderItems()}
      </div>
    );
  }
}

DisplayItem.propTypes = {
  item: PropTypes.object.isRequired,
};

class DisplayContainer extends DisplayItem {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  async componentDidMount() {
    let items = await this.props.item.getContents();
    this.setState({
      items,
    });
  }

  renderItems() {
    return (
      <ol style={{
        padding: "0",
        margin: "0",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "start",
      }}>
        {this.state.items.map(i => {
          let styles = {
            height: "191px",
            marginBottom: "5px",
            border: "1px solid black",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          };

          let ratio = i.thumbAspectRatio;
          let width = Math.floor(ratio * 191);
          if (i.thumb) {
            let thumb = i.device.transcodeImage(i.thumb, {
              width: width,
              height: 191,
              minSize: 1,
            });
            styles.backgroundImage = `url(${thumb})`;
          }

          return (
            <li style={{
              display: "block",
              listStyleImage: "none",
              textAlign: "center",
              margin: "10px",
              cursor: "pointer",
              width: `${width}px`,
            }} key={i.path} onClick={() => this.props.onSelectItem(i)}>
              <div style={styles}></div>
              <p>{i.name}</p>
            </li>
          );
        })}
      </ol>
    );
  }
}

DisplayContainer.propTypes = {
  item: PropTypes.object.isRequired,
  onSelectItem: PropTypes.func.isRequired,
};

class DisplayDevice extends DisplayContainer {
  getDisplayFields() {
    let { item } = this.props;
    let fields = super.getDisplayFields();

    fields.push(
      <li key="id"><b>ID:</b> {item.id}</li>,
    );

    return fields;
  }
}

export function getDisplayForItem(item, onSelectItem) {
  if (item instanceof PlexDevice) {
    return <DisplayDevice key={item.path} item={item} onSelectItem={onSelectItem}/>;
  } else if (item instanceof PlexContainer) {
    return <DisplayContainer key={item.path} item={item} onSelectItem={onSelectItem}/>;
  }

  return <DisplayItem key={item.path} item={item}/>;
}
