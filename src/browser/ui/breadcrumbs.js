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
          padding: "0 10px 0 0",
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
