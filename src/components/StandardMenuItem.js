import React from 'react';
import { MenuItem, styled } from '@mui/material';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: '0.95rem',
  minHeight: '40px',
  padding: '10px 16px',
  margin: '2px 8px',
  borderRadius: '6px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(231, 76, 60, 0.08)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(231, 76, 60, 0.12)',
    '&:hover': {
      backgroundColor: 'rgba(231, 76, 60, 0.16)',
    }
  }
}));

const StandardMenuItem = (props) => {
  return <StyledMenuItem {...props} />;
};

export default StandardMenuItem;

