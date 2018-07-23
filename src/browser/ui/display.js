import React from "react";
import PropTypes from "prop-types";

export class DisplayContainer extends React.Component {
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

          if (i.thumb) {
            let thumb = i.device.transcodeImage(i.thumb, {
              width: 127,
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
              width: "127px",
            }} key={i.path} onClick={() => this.props.onSelectItem(i)}>
              <div style={styles}></div>
              <p>{i.name}</p>
            </li>
          );
        })}
      </ol>
    );
  }

  render() {
    let { item } = this.props;
    return (
      <div>
        <ul>
          <li><b>Name:</b> {item.name}</li>
          <li><b>Path:</b> {item.path}</li>
          <li><b>Art:</b> {String(item.art)}</li>
          <li><b>Thumb:</b> {String(item.thumb)}</li>
        </ul>
        {this.renderItems()}
      </div>
    );
  }
}

DisplayContainer.propTypes = {
  item: PropTypes.object.isRequired,
  onSelectItem: PropTypes.func.isRequired,
};

export class DisplayDevice extends DisplayContainer {
  render() {
    let { item } = this.props;
    return (
      <div>
        <ul>
          <li><b>Name:</b> {item.name}</li>
          <li><b>Path:</b> {item.path}</li>
          <li><b>ID:</b> {item.id}</li>
        </ul>
        {this.renderItems()}
      </div>
    );
  }
}
