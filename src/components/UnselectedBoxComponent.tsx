import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import { UnselectedBoxComponentProps } from '@/types';

const classes = {
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 2,
    paddingRight: 1,
    paddingBlock: 1,
    background: 'primary.main',
    borderRadius: 2,
  },
};

export const UnselectedBoxComponent: FunctionComponent<UnselectedBoxComponentProps> = ({ children }) => {
  return (
    <Box role='box-section' sx={classes.itemContainer}>
      {children}
    </Box>
  );
};
