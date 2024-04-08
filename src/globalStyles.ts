import { css } from '@emotion/react';

export const styleVars = {
  lightBlack: 'rgba(0, 0, 0, 0.1)',
  black: '#333',
  darkBlack: 'rgba(0, 0, 0, 0.5)',

  white: '#fff',

  lightBlue: '#afcbff',
  blue: '#3d60a2bf',
  darkBlue: '#294271eb',
  darkestBlue: '#0e1c36',

  gray: '#bbb',
  lightGray: '#f0eef6',
  lightestGray: '#dadce0',

  lightRed: '#ff6161',
  red: '#ff4242',
  darkRed: 'rgba(255, 66, 66, 0.5)',

  yellow: '#ffde00',

  borderRadius: '3px',
};

export const cssReset = css({
  '*': {
    boxSizing: 'border-box',
    outline: 0,
    margin: 0,
    padding: 0,
    border: 0,
    scrollBehavior: 'smooth',
  },

  'ul, li': {
    listStyle: 'none',
  },

  '.reset': {
    backgroundColor: 'inherit',
    color: 'inherit',
    padding: 0,
    margin: 0,
    border: 0,
  },

  a: {
    width: 'fit-content',
    color: '#3f88c5',
    textDecoration: 'none',
    borderBottom: '1px solid transparent',
  },

  b: {
    fontWeight: 600,
    letterSpacing: '0.5px',
  },

  'h1, h2, h3, h4, h5, h6': {
    fontWeight: '400',
    margin: '.75em 0',
  },

  '::-webkit-scrollbar': {
    height: '7px',
    width: '7px',
    borderRadius: styleVars.borderRadius,
  },
  '::-webkit-scrollbar-track': {
    background: styleVars.lightBlack,
    borderRadius: styleVars.borderRadius,
  },
  '::-webkit-scrollbar-thumb': {
    background: styleVars.blue,
    borderRadius: styleVars.borderRadius,
  },
  '::-webkit-scrollbar-thumb:hover': {
    background: styleVars.darkestBlue,
  },
});

export const htmlBodyStyle = css({
  'html, body, #root': {
    height: '100svh',
    width: '100svw',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: '17px',
    color: styleVars.lightBlue,
    backgroundColor: styleVars.darkestBlue,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  html: {
    scrollbarGutter: 'stable both-edges',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  '.app': {
    marginTop: '3.5em',
    display: 'flex',
    gap: '1em',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
