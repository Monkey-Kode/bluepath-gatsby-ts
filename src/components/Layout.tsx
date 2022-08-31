import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import MapStyles from '../styles/MapStyles';
export const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <Typography></Typography>
      <MapStyles />
      {children}
    </>
  );
};
