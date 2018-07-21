import React from "react";
import PropTypes from "prop-types";

const Breadcrumbs = ({ crumbs, onSelectCrumb }) => {
  return (
    <ol style={{
      padding: "0",
      margin: "0",
    }}>
      {crumbs.map((c, index) => (
        <li style={{
          display: "inline",
          listStyleType: "none",
          padding: "0 5px 0 5px",
          cursor: "pointer",
        }} key={c.path} onClick={() => onSelectCrumb(index)}>
          {c.name}
        </li>
      ))}
    </ol>
  );
};

Breadcrumbs.propTypes = {
  crumbs: PropTypes.array.isRequired,
  onSelectCrumb: PropTypes.func.isRequired,
};

export default Breadcrumbs;
