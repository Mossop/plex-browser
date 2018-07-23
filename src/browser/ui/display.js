import React from "react";
import PropTypes from "prop-types";

export class DisplayItem extends React.Component {
  getDisplayFields() {
    let { item } = this.props;

    return [
      <li key="name"><b>Name:</b> {item.name}</li>,
      <li key="path"><b>Path:</b> {item.path}</li>,
      <li key="art"><b>Art:</b> {String(item.art)}</li>,
      <li key="thumb"><b>Thumb:</b> {String(item.thumb)}</li>,
    ];
  }

  render() {
    let fields = this.getDisplayFields();
    return (
      <div>
        <ul>
          {fields}
        </ul>
      </div>
    );
  }
}

DisplayItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export class DisplayContainer extends DisplayItem {
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
    let fields = this.getDisplayFields();
    return (
      <div>
        <ul>
          {fields}
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
  getDisplayFields() {
    let { item } = this.props;
    let fields = super.getDisplayFields();

    fields.push(
      <li key="id"><b>ID:</b> {item.id}</li>,
    );

    return fields;
  }
}
