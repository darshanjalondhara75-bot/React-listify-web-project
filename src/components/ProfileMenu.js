import React, { useState } from 'react';
import {
    Avatar,
    Menu,
    MenuItem,
    Divider,
    Typography,
    Box,
    Button,
    IconButton
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ user }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        window.localStorage.removeItem('buynsell');
        navigate('/login');
        window.location.reload();
    };



    // Default values if user is not provided
    const userName = user?.name || user?.username || "Listify User";
    const userEmail = user?.email || "user@example.com";
    const initial = userName.charAt(0).toUpperCase();

    return (
        <>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: 'white',
                        color: '#333',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                >
                    {initial}
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        width: 250, // Adjust width as needed
                        borderRadius: '12px',
                        padding: '16px',
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{
                        width: 56,
                        height: 56,
                        mb: 1,
                        bgcolor: 'white',
                        color: '#333',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                        {initial}
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {userEmail}
                    </Typography>
                </Box>

                <Divider />


                <Box sx={{ mt: 1 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<Logout />}
                        onClick={handleLogout}
                        sx={{
                            backgroundColor: '#ff4d4f',
                            color: 'white',
                            textTransform: 'none',
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: '#d9363e',
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Menu>
        </>
    );
};

export default ProfileMenu;
