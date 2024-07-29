import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2 }}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{ width: 150, height: 150, objectFit: 'contain' }}
      />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: 2 }}>
        <CardContent>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body2" color="textSecondary">{product.model}</Typography>
          <Typography variant="body2" color="textSecondary">SKU: {product.sku}</Typography>
          <Typography variant="body1" color="primary" sx={{ marginTop: 1 }}>${product.price.toFixed(2)}</Typography>
        </CardContent>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" color="primary" sx={{ flex: 1 }} onClick={() => console.log('Add to cart')}>
            Add to Cart
          </Button>
          <Button variant="outlined" color="primary" sx={{ flex: 1 }} component={Link} to={`/item/${product.id}`}>
            View Details
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default ProductCard;
