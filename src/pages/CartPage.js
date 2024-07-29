// src/pages/CartPage.js
import React from 'react';
import { Container, Box, Typography, Button, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useCartContext } from '../contexts/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, total } = useCartContext();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Your Cart
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Box flex={2}>
          <List>
            {cartItems.map((item, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={item.image} alt={item.name} variant="square" sx={{ width: 100, height: 100 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h6">{item.name || 'Unknown Product'}</Typography>}
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        {item.model || 'Model unknown'} - {item.sku || 'SKU unknown'}
                      </Typography>
                      <Typography variant="body1">
                        ${item.price !== undefined ? item.price.toFixed(2) : 'Price not available'}
                      </Typography>
                      <Button variant="outlined" color="secondary" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </Button>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ margin: '20px 0' }} />
          <Box>
            <Typography variant="h6">Special Offers</Typography>
            <Typography variant="body2">
              We found offers available based on items in your cart! <a href="#">See all</a>
            </Typography>
            <Divider sx={{ margin: '20px 0' }} />
            <Box>
              <Typography variant="h6">Looking for a lease-to-own option?</Typography>
              <Typography variant="body2">
                Enjoy the tech you want today. <a href="#">Learn more</a>
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="h6">Buying a gift for someone special?</Typography>
              <Typography variant="body2">
                Gift options can be added in checkout. <a href="#">Learn more</a>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box flex={1} pl={4} borderLeft="1px solid #ddd">
          <Typography variant="h6">Order Summary</Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Original Price</Typography>
            <Typography variant="body2">${total !== undefined ? total.toFixed(2) : 'N/A'}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Savings</Typography>
            <Typography variant="body2" color="error">- $0.00</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Estimated Sales Tax</Typography>
            <Typography variant="body2">Calculated in checkout</Typography>
          </Box>
          <Divider sx={{ margin: '10px 0' }} />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">${total !== undefined ? total.toFixed(2) : 'N/A'}</Typography>
          </Box>
          <Button variant="contained" color="primary" fullWidth>
            Checkout
          </Button>
          <Button variant="outlined" color="secondary" fullWidth sx={{ marginTop: '10px' }}>
            PayPal Checkout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CartPage;
