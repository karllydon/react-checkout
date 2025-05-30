import React from 'react';
import { bool, node } from 'prop-types';

function Header({ children, extra, small, ...props }) {
  return (
    <div className="title">
      <header
        role="button"
        className="flex items-center justify-between cursor-pointer select-none"
        {...props}
      >
        <span className={small ? 'text-sm' : 'text-base'}>{children}</span>
        {extra}
      </header>
    </div>
  );
}

Header.propTypes = {
  extra: node,
  small: bool,
  children: node.isRequired,
};

Header.defaultProps = {
  small: false,
  extra: null,
};

export default Header;
