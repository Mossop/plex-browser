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
      }}>
        {this.state.items.map(i => (
          <li style={{
            display: "inline-block",
            listStyleImage: "none",
            textAlign: "center",
            padding: "5px",
            margin: "10px",
            cursor: "pointer",
            width: "100px",
            height: "100px",
            border: "1px solid black",
          }} key={i.path} onClick={() => this.props.onSelectItem(i)}>
            <p>{i.name}</p>
          </li>
        ))}
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
          <li><b>Art:</b> {item.art}</li>
          <li><b>Thumb:</b> {item.thumb}</li>
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
