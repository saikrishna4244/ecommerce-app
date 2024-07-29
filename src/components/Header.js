// src/components/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          My Store
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            sx={{ marginRight: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        <Button color="inherit" component={Link} to="/cart">Cart</Button>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
