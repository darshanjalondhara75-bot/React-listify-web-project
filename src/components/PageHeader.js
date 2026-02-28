import React from 'react';
import { Box, Typography } from '@mui/material';

const PageHeader = ({ title, subtitle }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3, mt: 1 }}>
            <Typography variant="h5" sx={{
                fontSize: '24px',
                fontWeight: 500,
                mb: 0.5,
                textAlign: 'left',
                color: 'var(--mainDark)',
                fontFamily: '"Public Sans", sans-serif'
            }}>
                {title}
            </Typography>
            <Typography variant="body2" sx={{
                fontSize: '13px',
                color: 'var(--secondaryText)',
                textAlign: 'left',
                fontFamily: '"Public Sans", sans-serif'
            }}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default PageHeader;
