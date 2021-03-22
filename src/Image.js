import React from 'react';
import PropTypes from 'prop-types';


const Image = (props) => {
  const { src, alt, fallbackSrc, isLazy, style } = props;

  return <img
    src={isLazy ? fallbackSrc : src}
    alt={alt}
    className={isLazy ? 'lazy' : ''}
    data-src={src}
    style={style}
  />
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

Image.defaultProps = {
  isLazy: false
}

export default Image;
