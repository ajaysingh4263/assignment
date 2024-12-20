import React from 'react';
import { AppBar, Toolbar, InputAdornment, TextField, IconButton, Typography ,Badge } from '@mui/material';
import { Search as SearchIcon, Person, ShoppingCart } from '@mui/icons-material';
import { useCart } from '../context/Cartcontext';

const Header = ({ onSearch }) => {
    const {cart} = useCart()
    return (
        <AppBar position="static" sx={{ padding: '0.5rem 0' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Logo */}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                    onClick={() => (window.location.href = '/')}
                >
                    MyShop
                </Typography>
               

                {/* Search Bar */}
                <TextField
                    placeholder="Search..."
                    size="small"
                    variant="outlined"
                    onChange={(e) => onSearch(e.target.value)}
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        width: '40%',
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Profile and Cart Icons */}
                <div>
                <IconButton color="inherit">
                    <Badge badgeContent={cart.length} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
                    <IconButton color="inherit">
                        <Person />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
