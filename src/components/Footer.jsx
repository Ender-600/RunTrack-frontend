
import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 2,
        bgcolor: 'primary.main',
        color: 'white',
        position: 'fixed',
        bottom: 56, // 避开底部导航栏
        left: 0,
        right: 0,
      }}
    >
      <Typography variant="body2">RunTrack ©2024 Created by Boyu Liu, Xiaohan Mu, Ziheng Qi, Xiaoyang Chen</Typography>
    </Box>
  );
};

export default Footer;
