import React from "react";
import PropTypes from "prop-types";

function MainSection({ children, className = "", ...props }) {
    return (
        <main
            className={`flex-1 p-8 overflow-y-auto ${className}`}
            {...props}
        >
            {children}
        </main>
    );
}

MainSection.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default MainSection;