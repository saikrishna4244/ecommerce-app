// src/pages/SearchPage.js
import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const sampleProducts = [
  { id: 1, name: 'HP Envy 2-in-1 14"', model: '14-e0033dx', sku: '6571082', price: 599.99, image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6571/6571083_sd.jpg;maxHeight=334;maxWidth=600', description: 'A versatile 2-in-1 laptop for work and play.' },
  { id: 2, name: 'HP Envy 2-in-1 16"', model: '16-ad0037dx', sku: '6571083', price: 729.99, image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6571/6571083_sd.jpg;maxHeight=334;maxWidth=600', description: 'A powerful 2-in-1 laptop with a large screen.' },
  { id: 3, name: 'Gaming Laptop', model: 'GL-123', sku: '123456', price: 999.99, image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6571/6571083_sd.jpg;maxHeight=334;maxWidth=600', description: 'High-performance laptop for gaming enthusiasts.' },
  // Add more products as needed
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery().get('query');
  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Search Results for "{query}"
      </Typography>
      <Grid container spacing={2}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" component="p">
            No products found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default SearchPage;
