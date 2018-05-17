import { css } from 'styled-components';

const sizes = {
  phone: 480,
};

const media = Object.keys(sizes).reduce((result, label) => {
  result[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) { ${css(...args)} }
  `;
  return result;
}, {});

export default media;
