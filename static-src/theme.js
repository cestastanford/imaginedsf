/*
* Theme style constants used by styled-components.
*/


//  Colors
const colors = {
  lightBlack: '#333',
  darkerGrey: '#414042',
  darkGrey: '#58595b',
  miniMapGrey: 'rgba(0, 0, 0, 0.43)',
  lightGrey: '#cecece',
  lighterGrey: '#d8d8d8',
  panelBackground: '#efefef',
  brightAccent: '#d83a3a',
  brightAccent25: 'rgba(216, 58, 58, 0.53)',
  darkAccent: '#bf3333',
};

//  Opacities
const opacities = {
  linkHover: 0.8,
};

//  Transition Durations
const transitionDurations = {
  linkHover: '.2s',
};

//  Z-indices
const zIndices = {
  LoadingMessage: 500,
  Header: 400,
  LeafletMap: 100,
  Panel: 200,
  VisibleMapArea: 200,
  Modal: 300,
};

//  Shadows
const shadows = {
  Panel: '0 5px 10px rgba(0, 0, 0, 0.15)',
  Control: '2px 4px 6px rgba(0, 0, 0, 0.15)',
};

//  Radii
const radii = {
  standard: '5px',
};

export default {
  colors,
  opacities,
  transitionDurations,
  zIndices,
  shadows,
  radii,
};
