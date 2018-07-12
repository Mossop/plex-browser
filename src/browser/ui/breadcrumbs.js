import React from "react";
import PropTypes from "prop-types";

const Breadcrumbs = ({ crumbs }) => {
  return (
    <ol style={{
      padding: "0",
      margin: "0",
    }}>
      {crumbs.map(c => (
        <li style={{
          display: "span",
          listStyleType: "none",
          padding: "0 0 0 10px"
        }} key={c.path}>
          {c.name}
        </li>
      ))}
    </ol>
  );
};

Breadcrumbs.propTypes = {
  crumbs: PropTypes.array.isRequired,
};

export default Breadcrumbs;
