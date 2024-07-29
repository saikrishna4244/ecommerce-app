const fs = require('fs');
const path = require('path');

const directories = [
  'src/assets/images',
  'src/components',
  'src/pages',
  'src/contexts',
  'src/utils'
];

const files = {
  'src/components/Header.js': `
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Badge } from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';

function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { cartItems } = useCartContext();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(\`/search?q=\${encodeURIComponent(query)}\`);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          My Store
        </Typography>
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
          <InputBase
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ color: 'black', backgroundColor: '#fff', padding: '2px 10px', borderRadius: '4px' }}
          />
          <IconButton type="submit" color="inherit">
            <Search />
          </IconButton>
        </form>
        <IconButton color="inherit" onClick={() => navigate('/cart')}>
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
`,
  'src/components/ProductCard.js': `
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCartContext();
  const placeholderImage = 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6571/6571083_sd.jpg;maxHeight=334;maxWidth=600';

  return (
    <Card sx={{ display: 'flex', marginBottom: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={product.image || placeholderImage}
        alt={product.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 2 }}>
        <CardContent>
          <Typography component="div" variant="h6">
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Model: {product.model || 'N/A'} SKU: {product.sku || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            \${product.price ? product.price.toFixed(2) : 'N/A'}
          </Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: '10px' }} onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to={\`/item/\${product.id}\`}
            sx={{ marginTop: '10px' }}
          >
            View Details
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
}

export default ProductCard;
`,
  'src/components/FilterSidebar.js': `
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
`,
  'src/pages/HomePage.js': `
import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

const sampleProducts = [
  { id: 1, name: 'HP Envy 2-in-1 14"', model: '14-e0033dx', sku: '6571082', price: 599.99, image: 'https://via.placeholder.com/150', category: 'Electronics', available: true },
  { id: 2, name: 'HP Envy 2-in-1 16"', model: '16-ad0037dx', sku: '6571083', price: 729.99, image: 'https://via.placeholder.com/150', category: 'Electronics', available: true },
  { id: 3, name: 'Gaming Laptop', model: 'GL-123', sku: '123456', price: 999.99, image: 'https://via.placeholder.com/150', category: 'Gaming Laptops', available: true },
  { id: 4, name: 'Home Speaker', model: 'HS-456', sku: '234567', price: 199.99, image: 'https://via.placeholder.com/150', category: 'Home', available: true },
  { id: 5, name: 'Toy Robot', model: 'TR-789', sku: '345678', price: 49.99, image: 'https://via.placeholder.com/150', category: 'Toys', available: true },
  { id: 6, name: 'Gaming Chair', model: 'GC-234', sku: '456789', price: 149.99, image: 'https://via.placeholder.com/150', category: 'PC Gaming', available: true },
];

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
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Our Store
          </Typography>
          <Grid container spacing={3}>
            {filteredProducts.map(product => (
              <Grid item xs={12} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
`,
  'src/pages/ItemDetailPage.js': `
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import { useCartContext } from '../contexts/CartContext';

const sampleProducts = [
  { id: 1, name: 'HP Envy 2-in-1 14"', model: '14-e0033dx', sku: '6571082', price: 599.99, image: 'https://via.placeholder.com/150', description: 'A versatile 2-in-1 laptop for work and play.' },
  { id: 2, name: 'HP Envy 2-in-1 16"', model: '16-ad0037dx', sku: '6571083', price: 729.99, image: 'https://via.placeholder.com/150', description: 'A powerful 2-in-1 laptop with a large screen.' },
  { id: 3, name: 'Gaming Laptop', model: 'GL-123', sku: '123456', price: 999.99, image: 'https://via.placeholder.com/150', description: 'A high-performance laptop for gaming enthusiasts.' },
  { id: 4, name: 'Home Speaker', model: 'HS-456', sku: '234567', price: 199.99, image: 'https://via.placeholder.com/150', description: 'A high-quality speaker for home entertainment.' },
  { id: 5, name: 'Toy Robot', model: 'TR-789', sku: '345678', price: 49.99, image: 'https://via.placeholder.com/150', description: 'A fun and interactive toy robot for kids.' },
  { id: 6, name: 'Gaming Chair', model: 'GC-234', sku: '456789', price: 149.99, image: 'https://via.placeholder.com/150', description: 'A comfortable gaming chair for long sessions.' },
];

function ItemDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCartContext();
  const product = sampleProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
        <Typography variant="h4" component="h1" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {product.description}
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          \${product.price.toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Recommended Products
        </Typography>
        <Box sx={{ display: 'flex', overflowX: 'auto', padding: '16px 0' }}>
          {sampleProducts.map(recommendedProduct => (
            <Box key={recommendedProduct.id} sx={{ minWidth: '300px', marginRight: '16px' }}>
              <ProductCard product={recommendedProduct} />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default ItemDetailPage;
`,
  'src/pages/CartPage.js': `
import React from 'react';
import { Container, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { useCartContext } from '../contexts/CartContext';
import { Delete } from '@mui/icons-material';

function CartPage() {
  const { cartItems, removeFromCart } = useCartContext();

  return (
    <Container>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <List>
          {cartItems.map(item => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} secondary={\`\${item.price.toFixed(2)}\`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default CartPage;
`,
  'src/contexts/CartContext.js': `
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
`,
  'src/index.js': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
  'src/App.js': `
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ItemDetailPage from './pages/ItemDetailPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './contexts/CartContext';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/item/:id" element={<ItemDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
`,
  'src/index.css': `
body {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

a {
  text-decoration: none;
  color: inherit;
}
`
};

// Create directories
directories.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

// Create files with content
Object.entries(files).forEach(([filePath, fileContent]) => {
  fs.writeFileSync(path.join(__dirname, filePath), fileContent.trim());
});

console.log('Setup complete!');
