import React from 'react';
import { Box, Typography, Slider, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

function FilterSidebar({ filters, setFilters }) {
  const handlePriceChange = (event, newValue) => {
    setFilters({ ...filters, price: newValue });
  };

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    setFilters({ ...filters, categories: newCategories });
  };

  return (
    <Box sx={{ width: 250, padding: 2 }}>
      <Typography variant="h6">Filter by:</Typography>
      <Typography variant="subtitle1">Price</Typography>
      <Slider
        value={filters.price}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={3000}
        step={50}
        marks
      />
      <Typography variant="subtitle1">Categories</Typography>
      <FormGroup>
        {['Electronics', 'Home', 'Toys', 'Clothing', 'PC Gaming', 'Gaming Laptops'].map(category => (
          <FormControlLabel
            key={category}
            control={<Checkbox checked={filters.categories.includes(category)} onChange={() => handleCategoryChange(category)} />}
            label={category}
          />
        ))}
      </FormGroup>
    </Box>
  );
}

export default FilterSidebar;