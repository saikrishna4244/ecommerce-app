// src/pages/ItemDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { useCartContext } from '../contexts/CartContext';
import { sampleProducts } from './sampleProducts';
import { Link } from 'react-router-dom';

const ItemDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCartContext();
  const productId = parseInt(id, 10);
  const product = sampleProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Product not found
        </Typography>
      </Container>
    );
  }

  // Filtering out the current product from the recommendations
  const recommendedProducts = sampleProducts.filter(p => p.id !== productId);

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        <Typography variant="h4" component="h1" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {product.description}
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          ${product.price.toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </Box>

      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Recommended Products
        </Typography>
        <Grid container spacing={2}>
          {recommendedProducts.slice(0, 4).map(recommendedProduct => (
            <Grid item key={recommendedProduct.id} xs={12} sm={6} md={3}>
              <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <img src={recommendedProduct.image} alt={recommendedProduct.name} style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                <Typography variant="body1" component="p" gutterBottom>
                  {recommendedProduct.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  ${recommendedProduct.price.toFixed(2)}
                </Typography>
                <Button variant="outlined" color="primary" component={Link} to={`/item/${recommendedProduct.id}`}>
                  View Details
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ItemDetailPage;
