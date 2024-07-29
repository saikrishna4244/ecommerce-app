// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { sampleProducts } from './sampleProducts';
import BannerCarousel from '../components/BannerCarousel';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ price: [0, 3000], categories: [] });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setProducts(sampleProducts);
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      const matchesPrice = product.price >= filters.price[0] && product.price <= filters.price[1];
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
      return matchesQuery && matchesPrice && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [query, filters, products]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Our Store
          </Typography>
          
          {/* Advertisement Banner */}
          <Box sx={{ marginBottom: '20px' }}>
            <BannerCarousel />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
