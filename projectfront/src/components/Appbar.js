import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Backdrop, Menu, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SettingsIcon from '@mui/icons-material/Settings';
import { ListItemIcon, ListItemText } from '@mui/material';

const Appbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    handleClose();
    navigate('/pregled-datoteka');
  };

  const menuItemStyle = {
    fontSize: '0.9rem',
    padding: '10px 20px',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(65, 105, 225, 0.08)',
      color: 'primary.main',
    },
  };

  return (
    <Box className={"header"}>
      <AppBar position="static">
        <Toolbar className='header-toolbar'>
          <IconButton
            className='icon'
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            slotProps={{
              paper: {
                sx: {
                  marginTop: '-0.5vh',
                  borderRadius: '12px',
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                  minWidth: '180px',
                }
              }
            }}
          >
            <MenuItem onClick={handleNavigate} sx={menuItemStyle}>
            <ListItemIcon>
              <FolderOpenIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Pregled datoteka</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleClose} sx={menuItemStyle}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Moja opcija 2</ListItemText>
          </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              fontWeight: 'bold',
            }}>
            FizikaLLM
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Appbar;
