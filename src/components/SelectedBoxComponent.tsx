import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import { SelectedBoxComponentProps } from '@/types';

const classes = {
  selectedItemContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 2,
    paddingRight: 1,
    paddingBlock: 1,
    background: '#00AB5514',
    borderRadius: 2,
  },
};

export const SelectedBoxComponent: FunctionComponent<SelectedBoxComponentProps> = ({ children }) => {
  return (
    <Box role='box-section' sx={classes.selectedItemContainer}>
      {children}
    </Box>
  );
};
